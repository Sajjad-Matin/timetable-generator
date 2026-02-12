"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  Sparkles,
  Library,
  GraduationCap,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSubject } from "@/hooks/subject/use-subject";
import { AddSubjectModal } from "@/components/modals/add-subject-modal";
import { GeneralModal } from "@/components/modals/general-modal";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ConfirmationModal } from "@/components/modals/confirmation-modal";

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

export default function SubjectsPage() {
  const {
    subjects,
    loading,
    deleteSubject,
    updateSubject,
    fetchSubjects,
    deleteAllSubjects,
  } = useSubject();
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = React.useState(false);
  const [editingSubject, setEditingSubject] = React.useState<{
    id: string;
    name: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteSubject(id);
      toast.success("Subject deleted successfully");
    } catch (error) {
      toast.error("Failed to delete subject");
    }
  };

  const handleUpdate = async (name: string) => {
    if (!editingSubject) return;
    try {
      await updateSubject(editingSubject.id, { ...editingSubject, name });
      toast.success("Subject updated successfully");
      setEditingSubject(null);
    } catch (error) {
      toast.error("Failed to update subject");
    }
  };

  const handleDeleteAll = async () => {
    setIsDeleteAllModalOpen(true);
  };

  const confirmDeleteAll = async () => {
    try {
      await deleteAllSubjects();
      toast.success("All subjects deleted successfully");
      setIsDeleteAllModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete all subjects");
    }
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
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-bold tracking-widest uppercase">
                Curriculum Management
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Academic <span className="text-primary">Subjects</span>
            </h1>
            <p className="text-muted-foreground max-w-md">
              Define and organize your school's curriculum, including core
              subjects and electives.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleDeleteAll}
              disabled={subjects.length === 0}
              variant="outline"
              className="h-14 px-8 rounded-2xl border-destructive/20 text-destructive hover:bg-destructive hover:text-white transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-destructive"
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Delete All
            </Button>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="glass-button-primary h-14 px-8 rounded-2xl shadow-xl shadow-primary/20 group"
            >
              <Plus className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
              Add New Subject
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={item} className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            placeholder="Search subjects by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 pl-12 pr-4 rounded-2xl bg-background/40 border-primary/5 focus:border-primary/20 focus:ring-primary/10 transition-all duration-300"
          />
        </div>
      </motion.div>

      {/* Subjects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredSubjects.map((subject) => (
            <motion.div
              key={subject.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="group relative overflow-hidden rounded-[2rem] border-primary/5 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shadow-inner">
                      <Library className="h-8 w-8" />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingSubject(subject)}
                        className="h-10 w-10 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
                        title="Edit Teacher"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(subject.id)}
                        className="h-10 w-10 rounded-xl hover:bg-destructive/5 hover:text-destructive transition-colors"
                        title="Delete Teacher"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1 mb-6">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                      {subject.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredSubjects.length === 0 && !loading && (
        <motion.div
          variants={item}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
            <Library className="h-10 w-10 text-primary/20" />
          </div>
          <h3 className="text-xl font-bold mb-2">No subjects found</h3>
          <p className="text-muted-foreground max-w-xs">
            We couldn't find any subjects matching your search criteria.
          </p>
        </motion.div>
      )}

      <AddSubjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchSubjects}
      />

      <GeneralModal
        isOpen={!!editingSubject}
        onClose={() => setEditingSubject(null)}
        title="Edit Subject"
        description="Update the subject's name and details."
        defaultValue={editingSubject?.name || ""}
        onSubmit={handleUpdate}
      />

      <ConfirmationModal
        isOpen={isDeleteAllModalOpen}
        onClose={() => setIsDeleteAllModalOpen(false)}
        onConfirm={confirmDeleteAll}
        title="Delete All Subjects"
        description={`Are you sure you want to delete all ${subjects.length} subject(s)? This action cannot be undone and will permanently remove all subject records.`}
        confirmText="Delete All"
        cancelText="Cancel"
        isDestructive={true}
        isLoading={loading}
      />
    </motion.div>
  );
}
