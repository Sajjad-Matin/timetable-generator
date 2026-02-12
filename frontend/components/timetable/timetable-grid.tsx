"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  User,
  BookOpen,
  Plus,
  Calendar as CalendarIcon,
  Trash2,
  Sparkles,
} from "lucide-react";
import { useTimetable } from "@/hooks/timetable/use-timetable";
import { useDay } from "@/hooks/day/use-day";
import { usePeriod } from "@/hooks/period/use-period";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimetableGridProps {
  classId: string;
}

export function TimetableGrid({ classId }: TimetableGridProps) {
  const {
    timetable,
    loading: timetableLoading,
    deleteTimetableEntry,
  } = useTimetable();
  const { days, loading: daysLoading } = useDay();
  const { periods, loading: periodsLoading } = usePeriod();

  const loading = timetableLoading || daysLoading || periodsLoading;

  // Color mapping for subjects
  const getSubjectColor = (subjectName: string) => {
    const colors = [
      "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      "bg-amber-500/20 text-amber-400 border-amber-500/30",
      "bg-rose-500/20 text-rose-400 border-rose-500/30",
      "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    ];
    let hash = 0;
    for (let i = 0; i < subjectName.length; i++) {
      hash = subjectName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-64 rounded-[2rem] bg-primary/5 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!classId) {
    return (
      <Card className="flex flex-col items-center justify-center py-20 text-center rounded-[2rem] border-dashed border-2 border-primary/10 bg-transparent">
        <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
          <CalendarIcon className="h-10 w-10 text-primary/20" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground">
          No Class Selected
        </h3>
        <p className="text-muted-foreground max-w-xs">
          Please select a class group from the dropdown above to view its weekly
          schedule.
        </p>
      </Card>
    );
  }

  const classEntries = timetable.filter((entry) => entry.classId === classId);

  // Sort days and periods
  const sortedDays = [...days].sort((a, b) => {
    const order = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return order.indexOf(a.name) - order.indexOf(b.name);
  });
  const sortedPeriods = [...periods].sort((a, b) => a.number - b.number);

  return (
    <div className="overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0">
      <div className="min-w-[1000px] bg-card/30 backdrop-blur-xl rounded-[2.5rem] border border-primary/10 overflow-hidden shadow-2xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-primary/10">
              <th className="p-6 text-left text-xs font-bold text-muted-foreground uppercase tracking-widest bg-primary/5 w-40">
                Time / Day
              </th>
              {sortedDays.map((day) => (
                <th
                  key={day.id}
                  className="p-6 text-center text-xs font-bold text-foreground uppercase tracking-widest border-l border-primary/10"
                >
                  {day.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedPeriods.map((period) => (
              <tr
                key={period.id}
                className="border-b border-primary/5 last:border-0 group"
              >
                <td className="p-6 bg-primary/5">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">
                      {period.start_time} - {period.end_time}
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Period {period.number}
                    </span>
                  </div>
                </td>
                {sortedDays.map((day) => {
                  const entry = classEntries.find(
                    (e) => e.dayId === day.id && e.periodId === period.id
                  );

                  return (
                    <td
                      key={`${day.id}-${period.id}`}
                      className="p-3 border-l border-primary/5 min-w-[180px]"
                    >
                      {entry ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={cn(
                            "relative p-4 rounded-2xl border transition-all duration-300 group/item",
                            getSubjectColor(
                              entry.teacherSubject?.subject?.name || ""
                            )
                          )}
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <h4 className="font-bold text-sm leading-tight">
                                {entry.teacherSubject?.subject?.name}
                              </h4>

                            </div>
                            <div className="flex items-center text-[10px] font-medium opacity-80">
                              <User className="h-3 w-3 mr-1.5" />
                              <span className="truncate">
                                {entry.teacherSubject?.teacher?.name}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="h-full min-h-[80px] flex items-center justify-center rounded-2xl border border-dashed border-primary/5 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 group/empty">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-30 group-hover/empty:opacity-100 transition-opacity">
                            Free
                          </span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
