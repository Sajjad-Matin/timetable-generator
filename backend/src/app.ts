import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import classRoute from "./routes/class.route";
import subjectRoute from "./routes/subject.route";
import teacherRoute from "./routes/teacher.route";
import teacherSubjectRoute from "./routes/teacherSubject.route";
import teacherSubjectClassRoute from "./routes/teacherSubjectClass.route";
import dayRoute from "./routes/day.route";
import periodRoute from "./routes/period.route";
import teacherAvailabilityRoute from "./routes/teacherAvailability.route";
import timetableRoute from "./routes/timetable.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/subjects", subjectRoute);
app.use("/api/teachers", teacherRoute);
app.use("/api/teacherSubjects", teacherSubjectRoute);
app.use("/api/classes", classRoute);
app.use("/api/teacherSubjectClasses", teacherSubjectClassRoute);
app.use("/api/day", dayRoute);
app.use("/api/period", periodRoute);
app.use("/api/timetable", timetableRoute);
app.use("/api/teacherAvailability", teacherAvailabilityRoute);

app.get("/", (_, res) => {
  res.send("Timetable Manager API is running 🚀");
});

export default app;
