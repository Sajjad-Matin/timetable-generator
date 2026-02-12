import { Request, Response } from "express";
import prisma from "../prisma";

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const subject = await prisma.subject.create({
      data: {
        name,
      },
    });

    res.status(201).json(subject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await prisma.subject.findMany();
    res.status(200).json(subjects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const subject = await prisma.subject.findUnique({
      where: {
        id,
      },
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json(subject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const subject = await prisma.subject.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    res.status(200).json(subject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const subject = await prisma.subject.delete({
      where: {
        id,
      },
    });

    res.status(200).json(subject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAllSubjects = async (_: Request, res: Response) => {
  try {
    const deletedSubjects = await prisma.subject.deleteMany();

    res.status(200).json(deletedSubjects);
  } catch (error) {
    console.error("Error deleting subjects:", error);
    res.status(500).json({ message: "Failed to delete subjects" });
  }
};
