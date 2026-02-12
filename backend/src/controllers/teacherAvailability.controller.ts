import { Request, Response } from "express";
import prisma from "../prisma";

export const setTeacherAvailability = async (req: Request, res: Response) => {
  try {
    const { teacherId, dayId, periodId, isAvailable } = req.body;

    if (!teacherId || !dayId || !periodId || !isAvailable) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const availability = await prisma.teacherAvailability.upsert({
      where: {
        teacherId_dayId_periodId: {
          teacherId,
          dayId,
          periodId,
        },
      },
      update: {
        isAvailable: isAvailable ?? true,
      },
      create: {
        teacherId,
        dayId,
        periodId,
        isAvailable: isAvailable ?? true,
      },
    });

    res.status(201).json(availability);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to set teacher availability",
    });
  }
};

export const getTeacherAvailability = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).json({ message: "teacherId is required" });
    }

    const availability = await prisma.teacherAvailability.findMany({
      where: { teacherId },
      include: {
        day: true,
        period: true,
      },
      orderBy: [{ dayId: "asc" }, { periodId: "asc" }],
    });

    res.json(availability);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get teacher availability",
    });
  }
};
