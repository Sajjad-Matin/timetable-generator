import { Request, Response } from "express";
import prisma from "../prisma";

export const createClass = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Class name is required" });
    }

    const existingClass = await prisma.class.findUnique({
      where: { name },
    });

    if (existingClass) {
      return res.status(400).json({ message: "Class already exists" });
    }

    const newClass = await prisma.class.create({
      data: { name },
    });

    res.status(201).json(newClass);
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ message: "Failed to create class" });
  }
};

export const getClasses = async (_: Request, res: Response) => {
  try {
    const classes = await prisma.class.findMany();

    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ message: "Failed to fetch classes" });
  }
};

export const getClassById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const foundClass = await prisma.class.findUnique({
      where: {
        id,
      },
    });

    if (!foundClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(foundClass);
  } catch (error) {
    console.error("Error fetching class:", error);
    res.status(500).json({ message: "Failed to fetch class" });
  }
};

export const updateClass = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const updatedClass = await prisma.class.update({
      where: { id },
      data: { name },
    });

    res.status(200).json(updatedClass);
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ message: "Failed to update class" });
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    const deletedClass = await prisma.class.delete({
      where: { id: req.params.id },
    });

    res.status(200).json(deletedClass);
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({ message: "Failed to delete class" });
  }
};

export const deleteAllClasses = async (_: Request, res: Response) => {
  try {
    const deletedClasses = await prisma.class.deleteMany();

    res.status(200).json(deletedClasses);
  } catch (error) {
    console.error("Error deleting classes:", error);
    res.status(500).json({ message: "Failed to delete classes" });
  }
};
