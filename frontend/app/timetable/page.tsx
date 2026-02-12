"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  Plus,
  Settings2,
  Sparkles,
  Download,
  Share2,
  Printer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClass } from "@/hooks/class/use-class";
import { useTimetable } from "@/hooks/timetable/use-timetable";
import { useDay } from "@/hooks/day/use-day";
import { usePeriod } from "@/hooks/period/use-period";
import { TimetableGrid } from "@/components/timetable/timetable-grid";
import { InitializeDaysModal } from "@/components/modals/initialize-days-modal";
import { AddPeriodModal } from "@/components/modals/add-period-modal";
import { AddTimetableEntryModal } from "@/components/modals/add-timetable-entry-modal";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function TimetablePage() {
  const searchParams = useSearchParams();
  const { classes } = useClass();
  const { refreshTimetable } = useTimetable();
  const { refreshDays } = useDay();
  const { refreshPeriods } = usePeriod();
  const [selectedClassId, setSelectedClassId] = React.useState<string>(
    searchParams.get("classId") || ""
  );

  const [isInitModalOpen, setIsInitModalOpen] = React.useState(false);
  const [isPeriodModalOpen, setIsPeriodModalOpen] = React.useState(false);
  const [isEntryModalOpen, setIsEntryModalOpen] = React.useState(false);

  React.useEffect(() => {
    const classId = searchParams.get("classId");
    if (classId) {
      setSelectedClassId(classId);
    }
  }, [searchParams]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-8"
    >
      {/* Header Section */}
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/10 p-8 md:p-10"
      >
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-bold tracking-widest uppercase">
                Schedule Planner
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Master <span className="text-primary">Timetable</span>
            </h1>
            <p className="text-muted-foreground max-w-md">
              Visualize and manage class schedules, period assignments, and room
              allocations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-xl border-primary/10 hover:bg-primary/5"
            >
              <Printer className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-xl border-primary/10 hover:bg-primary/5"
            >
              <Download className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-xl border-primary/10 hover:bg-primary/5"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Controls Section */}
      <motion.div
        variants={item}
        className="flex flex-col md:flex-row items-center justify-between gap-6 bg-card/40 backdrop-blur-md p-6 rounded-[2rem] border border-primary/5 shadow-sm"
      >
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 border border-primary/10">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">
              Class
            </span>
          </div>
          <Select value={selectedClassId} onValueChange={setSelectedClassId}>
            <SelectTrigger className="w-full md:w-[280px] h-12 rounded-xl bg-background/50 border-primary/5 focus:ring-primary/10">
              <SelectValue placeholder="Select a class group..." />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-primary/10">
              {classes.map((cls) => (
                <SelectItem key={cls.id} value={cls.id} className="rounded-lg">
                  {cls.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>
      {/* Timetable Grid */}
      <motion.div variants={item} className="relative">
        <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-[2.5rem] blur-2xl -z-10" />
        <TimetableGrid classId={selectedClassId} />
      </motion.div>

      <InitializeDaysModal
        isOpen={isInitModalOpen}
        onClose={() => setIsInitModalOpen(false)}
        onSuccess={refreshDays}
      />
      <AddPeriodModal
        isOpen={isPeriodModalOpen}
        onClose={() => setIsPeriodModalOpen(false)}
        onSuccess={refreshPeriods}
      />
      <AddTimetableEntryModal
        isOpen={isEntryModalOpen}
        onClose={() => setIsEntryModalOpen(false)}
        onSuccess={refreshTimetable}
        initialClassId={selectedClassId}
      />
    </motion.div>
  );
}
