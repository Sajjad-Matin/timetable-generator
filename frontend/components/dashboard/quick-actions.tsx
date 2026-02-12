"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  BookOpen,
  DoorOpen,
  Plus,
  CheckCheck,
  Settings,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const actions = [
  {
    title: "View Timetables",
    description: "Access all generated schedules",
    icon: Calendar,
    href: "/timetable",
    color: "bg-blue-500/10 text-blue-500",
    hoverColor: "group-hover:bg-blue-500 group-hover:text-white",
  },
  {
    title: "Add Teacher",
    description: "Register a new faculty member",
    icon: Users,
    href: "/teachers",
    color: "bg-purple-500/10 text-purple-500",
    hoverColor: "group-hover:bg-purple-500 group-hover:text-white",
  },
  {
    title: "Add Subject",
    description: "Define a new course or subject",
    icon: BookOpen,
    href: "/subjects",
    color: "bg-orange-500/10 text-orange-500",
    hoverColor: "group-hover:bg-orange-500 group-hover:text-white",
  },
  {
    title: "Add Class",
    description: "Create a new student group",
    icon: DoorOpen,
    href: "/classes",
    color: "bg-emerald-500/10 text-emerald-500",
    hoverColor: "group-hover:bg-emerald-500 group-hover:text-white",
  },
  {
    title: "Assignments",
    description: "Link teachers and subjects",
    icon: CheckCheck,
    href: "/assignments",
    color: "bg-pink-500/10 text-pink-500",
    hoverColor: "group-hover:bg-pink-500 group-hover:text-white",
  },
  {
    title: "Generate",
    description: "Configure and run generator",
    icon: Settings,
    href: "/settings",
    color: "bg-slate-500/10 text-slate-500",
    hoverColor: "group-hover:bg-slate-500 group-hover:text-white",
  },
];

export function QuickActions() {
  return (
    <Card className="glass border-primary/5 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
            <CardDescription className="mt-1">
              Common tasks and operations
            </CardDescription>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center">
            <Plus className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => (
            <Link key={action.title} href={action.href} className="group">
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="relative h-full"
              >
                <Button
                  variant="outline"
                  className="h-full w-full justify-start items-start flex-col gap-4 p-6 transition-all duration-300 bg-transparent border-primary/5 hover:border-primary/20 hover:bg-accent/50 group-hover:shadow-xl"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${action.color} ${action.hoverColor}`}
                  >
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-base font-bold tracking-tight">
                      {action.title}
                    </span>
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      {action.description}
                    </span>
                  </div>
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </Button>
              </motion.div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
