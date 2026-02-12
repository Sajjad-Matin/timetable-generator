import { Request, Response } from "express";
import prisma from "../prisma";

export const createTeacherSubject = async (req: Request, res: Response) => {
  try {
    const { teacherId, subjectId, periodsPerWeek, allClasses } = req.body;

    if (!teacherId || !subjectId || !periodsPerWeek) {
      return res.status(400).json({
        message: "teacherId, subjectId and periodsPerWeek are required",
      });
    }

    // prevent duplicate assignment
    const exists = await prisma.teacherSubject.findFirst({
      where: {
        teacherId,
        subjectId,
      },
    });

    if (exists) {
      return res
        .status(400)
        .json({ message: "Teacher already assigned to this subject" });
    }

    const teacherSubject = await prisma.teacherSubject.create({
      data: {
        teacherId,
        subjectId,
        periodsPerWeek,
        allClasses: allClasses ?? false,
      },
    });
    res.status(201).json(teacherSubject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create teacher subject" });
  }
};

export const getAllTeacherSubjects = async (_: Request, res: Response) => {
  try {
    const data = await prisma.teacherSubject.findMany({
      include: {
        teacher: true,
        subject: true,
      },
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get teacher subjects" });
  }
};

export const getTeacherSubjectById = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).json({ message: "teacher ID is required!" });
    }

    const data = await prisma.teacherSubject.findMany({
      where: { teacherId },
      include: {
        subject: true,
        classes: {
          include: { class: true },
        },
      },
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get teacher subjects" });
  }
};

export const updateTeacherSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    const data = await prisma.teacherSubject.update({
      where: { id },
      data: req.body,
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update teacher subject" });
  }
};

export const deleteTeacherSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    const data = await prisma.teacherSubject.delete({
      where: { id },
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete teacher subject" });
  }
};

export const deleteAllTeacherSubjects = async (_: Request, res: Response) => {
  try {
    // This will cascade delete related TeacherSubjectClass entries if configured in Prisma
    // Otherwise we might need to delete them explicitly first.
    // Assuming Prisma schema handles cascade or we want to clear everything.
    await prisma.teacherSubjectClass.deleteMany(); // Clear dependent records first just in case
    await prisma.teacherSubject.deleteMany();

    res.json({ message: "All teacher subjects deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete all teacher subjects" });
  }
};
