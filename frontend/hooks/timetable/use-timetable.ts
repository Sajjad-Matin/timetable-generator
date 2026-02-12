import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";

export interface TimetableEntry {
  id: string;
  classId: string;
  teacherSubjectId: string;
  dayId: string;
  periodId: number;
  class: {
    id: string;
    name: string;
  };
  teacherSubject: {
    id: string;
    teacher: {
      id: string;
      name: string;
    };
    subject: {
      id: string;
      name: string;
    };
  };
  day: {
    id: string;
    name: string;
  };
  period: {
    id: number;
    number: number;
    start_time: string | null;
    end_time: string | null;
  };
}

export const useTimetable = () => {
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTimetable = async () => {
    setLoading(true);
    try {
      const response = await apiFetch<TimetableEntry[]>("/timetable");
      setTimetable(response);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const createTimetableEntry = async (data: any) => {
    setLoading(true);
    try {
      await apiFetch("/timetable", {
        method: "POST",
        body: JSON.stringify(data),
      });
      await fetchTimetable();
    } catch (error) {
      setError(error as string);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteTimetableEntry = async (id: string) => {
    setLoading(true);
    try {
      await apiFetch(`/timetable/${id}`, {
        method: "DELETE",
      });
      await fetchTimetable();
    } catch (error) {
      setError(error as string);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const generateTimetable = async () => {
    setLoading(true);
    try {
      const response = await apiFetch<any>("/timetable/generate", {
        method: "POST",
      });
      await fetchTimetable();
      return response;
    } catch (error) {
      setError(error as string);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  return {
    timetable,
    loading,
    error,
    refreshTimetable: fetchTimetable,
    createTimetableEntry,
    deleteTimetableEntry,
    generateTimetable,
  };
};
