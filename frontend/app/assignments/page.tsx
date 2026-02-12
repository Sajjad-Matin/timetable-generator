"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Plus,
  Search,
  ChevronDown,
  ChevronRight,
  User,
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
  Link as LinkIcon,
  MoreVertical,
  Trash2,
  Recycle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTeacher } from "@/hooks/teacher/use-teachers";
import { useSubject } from "@/hooks/subject/use-subject";
import { useClass } from "@/hooks/class/use-class";
import { AssignSubjectToTeacherModal } from "@/components/modals/assign-subject-to-teacher-modal";
import { AssignTeacherToClassModal } from "@/components/modals/assign-teacher-to-class-modal";
import { cn } from "@/lib/utils";
import { useTeacherSubject } from "@/hooks/teacher-subject/use-teacher-subject";
import { ConfirmationModal } from "@/components/modals/confirmation-modal";
import { useTeacherSubjectClass } from "@/hooks/teacher-subject-class/use-teacher-subject-class";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function AssignmentsPage() {
  const { teachers, fetchTeachers } = useTeacher();
  const {
    teacherSubjects,
    deleteTeacherSubject,
    deleteAllTeacherSubjects,
    refreshTeacherSubjects,
  } = useTeacherSubject();
  const {
    teacherSubjectClasses,
    deleteAllTeacherSubjectClasses,
    refreshTeacherSubjectClasses,
  } = useTeacherSubjectClass();
  const { classes, unassignTeacherFromClass } = useClass();

  const [isSubjectModalOpen, setIsSubjectModalOpen] = React.useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedTeachers, setExpandedTeachers] = React.useState<Set<string>>(
    new Set()
  );
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = React.useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = React.useState<string>('');

  const toggleTeacher = (id: string) => {
    const newSet = new Set(expandedTeachers);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedTeachers(newSet);
  };

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasAssignments = teachers.some((t) => (t.subjects?.length ?? 0) > 0);

  const refreshAll = async () => {
    await Promise.all([
      fetchTeachers(),
      refreshTeacherSubjects(),
      refreshTeacherSubjectClasses(),
    ]);
  };

  const deleteAllAssignments = async () => {
    await deleteAllTeacherSubjectClasses();
    await deleteAllTeacherSubjects();
    await refreshAll();
  };

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
                Resource Allocation
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Faculty <span className="text-primary">Assignments</span>
            </h1>
            <p className="text-muted-foreground max-w-md">
              Connect teachers with their subjects and assign them to specific
              class groups.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setIsDeleteAllModalOpen(true)}
              className="glass-button-primary h-14 px-8 rounded-2xl border-destructive/20 text-destructive bg-destructive text-white hover:bg-destructive/80 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-destructive"
              disabled={!hasAssignments}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete All Assignments
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Search Section */}
      <motion.div variants={item} className="relative group">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <Input
          placeholder="Search faculty members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-14 pl-12 pr-4 rounded-2xl bg-background/40 border-primary/5 focus:border-primary/20 focus:ring-primary/10 transition-all duration-300"
        />
      </motion.div>

      {/* Assignments List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredTeachers.map((teacher) => {
            const isExpanded = expandedTeachers.has(teacher.id);

            return (
              <motion.div
                key={teacher.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="group"
              >
                <Card
                  className={cn(
                    "overflow-hidden rounded-2xl border-primary/5 bg-card/50 backdrop-blur-sm transition-all duration-300",
                    isExpanded
                      ? "ring-1 ring-primary/20 shadow-xl"
                      : "hover:bg-card/80 hover:shadow-md"
                  )}
                >
                  <div
                    className="p-6 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleTeacher(teacher.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">
                          {teacher.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="hidden md:flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-primary/5 text-primary border-none text-[10px] font-bold px-2 py-0.5"
                        >
                          {teacher.subjects?.length || 0} Subjects
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-primary/5 text-primary border-none text-[10px] font-bold px-2 py-0.5"
                        >
                          {teacher.subjects?.reduce(
                            (acc, s) => acc + (s.classes?.length || 0),
                            0
                          ) || 0}{" "}
                          Classes
                        </Badge>
                      </div>
                      <div
                        className={cn(
                          "h-8 w-8 rounded-lg flex items-center justify-center transition-transform duration-300",
                          isExpanded
                            ? "rotate-180 bg-primary/10 text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-primary/5 space-y-6">
                          {/* Subjects Section */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                              <BookOpen className="h-3 w-3" />
                              Assigned Subjects
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {teacherSubjects?.map((ts) => (
                                <Badge
                                  key={ts.id}
                                  className="bg-background/50 border-primary/10 text-foreground px-3 py-1 rounded-lg flex items-center gap-2 group/badge"
                                >
                                  {ts.subject.name}
                                  <button
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      if (
                                        confirm(`Unassign ${ts.subject.name}?`)
                                      ) {
                                        await deleteTeacherSubject(ts.id);
                                        fetchTeachers();
                                      }
                                    }}
                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                              {(!teacher.subjects ||
                                teacher.subjects.length === 0) && (
                                <span className="text-xs text-muted-foreground italic">
                                  No subjects assigned
                                </span>
                              )}
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTeacherId(teacher.id);
                                  setIsSubjectModalOpen(true);
                                }}
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 rounded-lg text-[10px] font-bold uppercase tracking-wider text-primary hover:bg-primary/5"
                              >
                                <Plus className="h-3 w-3 mr-1" /> Add Subject
                              </Button>
                            </div>
                          </div>

                          {/* Classes Section */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                              <GraduationCap className="h-3 w-3" />
                              Assigned Classes
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {teacher.subjects
                                ?.flatMap((ts) =>
                                  ts.classes.map((c) => ({
                                    ...c,
                                    subjectName: ts.subject.name,
                                  }))
                                )
                                .map((cls) => (
                                  <div
                                    key={cls.id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-primary/5 group/class"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                                        <LinkIcon className="h-4 w-4" />
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-sm font-medium">
                                          {cls.class.name}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground">
                                          {cls.subjectName}
                                        </span>
                                      </div>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={async (e) => {
                                        e.stopPropagation();
                                        if (
                                          confirm(
                                            `Remove ${cls.class.name} assignment?`
                                          )
                                        ) {
                                          await unassignTeacherFromClass(
                                            cls.id
                                          );
                                          fetchTeachers();
                                        }
                                      }}
                                      className="h-8 w-8 rounded-lg opacity-0 group-hover/class:opacity-100 transition-opacity"
                                    >
                                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                    </Button>
                                  </div>
                                ))}
                              <Button
                                disabled={
                                  !teacher.subjects ||
                                  teacher.subjects.length === 0
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTeacherId(teacher.id);
                                  setIsClassModalOpen(true);
                                }}
                                variant="outline"
                                className="h-auto py-3 rounded-xl border-dashed border-primary/10 bg-transparent hover:bg-primary/5 text-xs font-bold text-primary"
                              >
                                <Plus className="h-3 w-3 mr-2" /> Assign to
                                Class
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredTeachers.length === 0 && (
        <motion.div
          variants={item}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
            <ClipboardList className="h-10 w-10 text-primary/20" />
          </div>
          <h3 className="text-xl font-bold mb-2">No faculty members found</h3>
          <p className="text-muted-foreground max-w-xs">
            We couldn't find any teachers matching your search criteria.
          </p>
        </motion.div>
      )}

      <ConfirmationModal
        isOpen={isDeleteAllModalOpen}
        onClose={() => setIsDeleteAllModalOpen(false)}
        title="Delete All Assignments"
        description="Are you sure you want to delete all assignments?"
        onConfirm={() => {
          deleteAllAssignments();
          setIsDeleteAllModalOpen(false);
        }}
      />

      <AssignSubjectToTeacherModal
        isOpen={isSubjectModalOpen}
        onClose={() => {
          setIsSubjectModalOpen(false);
          setSelectedTeacherId('');
        }}
        onSuccess={refreshAll}
        defaultTeacherId={selectedTeacherId}
      />
      <AssignTeacherToClassModal
        isOpen={isClassModalOpen}
        onClose={() => {
          setIsClassModalOpen(false);
          setSelectedTeacherId('');
        }}
        onSuccess={refreshAll}
        defaultTeacherId={selectedTeacherId}
      />
    </motion.div>
  );
}
