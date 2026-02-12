import { Request, Response } from "express";
import prisma from "../prisma";

export const createDay = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Day name is required" });
    }

    const exists = await prisma.day.findUnique({
      where: { name },
    });

    if (exists) {
      return res.status(400).json({ message: "Day already exists" });
    }

    const day = await prisma.day.create({
      data: { name },
    });

    res.status(201).json(day);
  } catch (error) {
    res.status(500).json({ message: "Failed to create day" });
  }
};

export const getDays = async (_: Request, res: Response) => {
  const days = await prisma.day.findMany({
    orderBy: { name: "asc" },
  });

  res.json(days);
};

export const deleteDay = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.day.delete({ where: { id } });
    res.json({ message: "Day deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete day" });
  }
};
