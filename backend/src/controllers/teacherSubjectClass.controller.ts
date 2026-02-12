import { Request, Response } from "express";
import prisma from "../prisma";

export const assignTeacherSubjectToClass = async (
  req: Request,
  res: Response
) => {
  try {
    const { teacherSubjectId, classId, classIds } = req.body;

    if (!teacherSubjectId) {
      return res
        .status(400)
        .json({ message: "Teacher Subject ID is required!" });
    }

    if (!classId && (!classIds || classIds.length === 0)) {
      return res.status(400).json({ message: "Class ID(s) are required!" });
    }

    // Normalize to array
    const targets: string[] =
      classIds || (classId === "all" ? ["all"] : [classId]);

    if (targets.includes("all")) {
      const classes = await prisma.class.findMany();
      let createdCount = 0;

      for (const cls of classes) {
        const exists = await prisma.teacherSubjectClass.findFirst({
          where: {
            teacherSubjectId,
            classId: cls.id,
          },
        });

        if (!exists) {
          await prisma.teacherSubjectClass.create({
            data: {
              teacherSubjectId,
              classId: cls.id,
            },
          });
          createdCount++;
        }
      }
      return res
        .status(201)
        .json({ message: `Assigned to ${createdCount} classes.` });
    }

    let createdCount = 0;
    for (const id of targets) {
      const exists = await prisma.teacherSubjectClass.findFirst({
        where: {
          teacherSubjectId,
          classId: id,
        },
      });

      if (!exists) {
        await prisma.teacherSubjectClass.create({
          data: {
            teacherSubjectId,
            classId: id,
          },
        });
        createdCount++;
      }
    }

    res.status(201).json({ message: `Assigned to ${createdCount} classes.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to assign subject to class" });
  }
};

export const getClassesByTeacherSubject = async (
  req: Request,
  res: Response
) => {
  try {
    const { teacherSubjectId } = req.params;

    const data = await prisma.teacherSubjectClass.findMany({
      where: { teacherSubjectId },
      include: {
        class: true,
        teacherSubject: {
          include: {
            teacher: true,
            subject: true,
          },
        },
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeTeacherSubjectFromClass = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await prisma.teacherSubjectClass.delete({
      where: { id },
    });

    res.json({ message: "Assignment removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mesage: "Internal Server Error" });
  }
};

export const getAllTeacherSubjectClasses = async (
  _: Request,
  res: Response
) => {
  try {
    const data = await prisma.teacherSubjectClass.findMany({
      include: {
        class: true,
        teacherSubject: {
          include: {
            teacher: true,
            subject: true,
          },
        },
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAllTeacherSubjectClasses = async (
  _: Request,
  res: Response
) => {
  try {
    await prisma.teacherSubjectClass.deleteMany();
    res.json({ message: "All class assignments deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
