import prisma from "../prisma";

/* =========================
   GENERATE FOR ONE CLASS
========================= */
export const generateTimetableForClass = async (classId: string) => {
  const days = await prisma.day.findMany();
  const periods = await prisma.period.findMany();

  const teacherSubjects = await prisma.teacherSubject.findMany({
    where: {
      OR: [
        { allClasses: true },
        {
          classes: {
            some: { classId },
          },
        },
      ],
    },
  });

  const createdEntries = [];

  for (const ts of teacherSubjects) {
    let remaining = ts.periodsPerWeek;

    for (const day of days) {
      for (const period of periods) {
        if (remaining === 0) break;

        const classBusy = await prisma.timetable.findFirst({
          where: { classId, dayId: day.id, periodId: period.id },
        });
        if (classBusy) continue;

        const unavailable = await prisma.teacherAvailability.findUnique({
          where: {
            teacherId_dayId_periodId: {
              teacherId: ts.teacherId,
              dayId: day.id,
              periodId: period.id,
            },
          },
        });
        if (unavailable?.isAvailable === false) continue;

        const teacherBusy = await prisma.timetable.findFirst({
          where: {
            teacherSubject: { teacherId: ts.teacherId },
            dayId: day.id,
            periodId: period.id,
          },
        });
        if (teacherBusy) continue;

        const entry = await prisma.timetable.create({
          data: {
            classId,
            teacherSubjectId: ts.id,
            dayId: day.id,
            periodId: period.id,
          },
        });

        createdEntries.push(entry);
        remaining--;
      }
    }
  }

  return createdEntries;
};

/* =========================
   GENERATE FOR ALL CLASSES
========================= */
export const generateTimetableForAllClasses = async () => {
  const classes = await prisma.class.findMany();

  let totalScheduled = 0;

  for (const cls of classes) {
    // optional: clear old timetable
    await prisma.timetable.deleteMany({
      where: { classId: cls.id },
    });

    const result = await generateTimetableForClass(cls.id);
    totalScheduled += result.length;
  }

  return {
    classes: classes.length,
    scheduled: totalScheduled,
  };
};
