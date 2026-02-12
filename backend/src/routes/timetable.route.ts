import { Router } from "express";
import {
  generateTimetable,
  getTimetable,
} from "../controllers/timetable.controller";

const router = Router();

router.post("/generate", generateTimetable);
router.get("/", getTimetable);

export default router;
