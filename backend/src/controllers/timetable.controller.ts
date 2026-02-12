import { Request, Response } from "express";
import { generateTimetableForAllClasses } from "../services/timetable.service";
import prisma from "../prisma";

export const generateTimetable = async (req: Request, res: Response) => {
  try {
    const result = await generateTimetableForAllClasses();

    res.status(201).json({
      message: "Timetable generated for all classes",
      ...result,
    });
  } catch (error: any) {
    console.error("Timetable generation error:", error.message);

    res.status(400).json({
      message: error.message || "Failed to generate timetable",
    });
  }
};

export const getTimetable = async (_req: Request, res: Response) => {
  try {
    const timetable = await prisma.timetable.findMany({
      include: {
        class: true,
        day: true,
        period: true,
        teacherSubject: {
          include: {
            teacher: true,
            subject: true,
          },
        },
      },
      orderBy: [{ classId: "asc" }, { dayId: "asc" }, { periodId: "asc" }],
    });

    res.json(timetable);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch timetable" });
  }
};
