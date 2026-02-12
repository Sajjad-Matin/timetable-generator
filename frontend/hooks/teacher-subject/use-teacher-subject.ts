import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { type Subject } from "../subject/use-subject";
import { type Teacher } from "../teacher/use-teachers";

export interface TeacherSubject {
  id: string;
  teacherId: string;
  subjectId: string;
  periodsPerWeek: number;
  allClasses: boolean;
  createdAt: string;
  teacher: Teacher;
  subject: Subject;
}

export const useTeacherSubject = () => {
  const [teacherSubjects, setTeacherSubjects] = useState<TeacherSubject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeacherSubjects = async () => {
    setLoading(true);
    try {
      const response = await apiFetch<TeacherSubject[]>("/teacherSubjects");
      setTeacherSubjects(response);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const createTeacherSubject = async (
    subjectId: string,
    teacherId: string
  ) => {
    setLoading(true);
    try {
      await apiFetch("/teacherSubjects", {
        method: "POST",
        body: JSON.stringify({ subjectId, teacherId, periodsPerWeek: 1 }), // Default periods
      });
      await fetchTeacherSubjects();
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const deleteTeacherSubject = async (id: string) => {
    setLoading(true);
    try {
      await apiFetch(`/teacherSubjects/${id}`, {
        method: "DELETE",
      });
      await fetchTeacherSubjects();
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const deleteAllTeacherSubjects = async () => {
    setLoading(true);
    try {
      await apiFetch("/teacherSubjects/all", {
        method: "DELETE",
      });
      await fetchTeacherSubjects();
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacherSubjects();
  }, []);

  return {
    teacherSubjects,
    loading,
    error,
    createTeacherSubject,
    deleteTeacherSubject,
    deleteAllTeacherSubjects,
    refreshTeacherSubjects: fetchTeacherSubjects,
  };
};
