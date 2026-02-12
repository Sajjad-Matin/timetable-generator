"use client";

import * as React from "react";
import {
  Calendar,
  LayoutDashboard,
  Users,
  BookOpen,
  Library,
  Settings,
  ChevronRight,
  ClipboardList,
  Sparkles,
  LogOut,
  User,
  Bell,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    color: "text-blue-500",
  },
  {
    title: "Timetable",
    url: "/timetable",
    icon: Calendar,
    color: "text-purple-500",
  },
  {
    title: "Teachers",
    url: "/teachers",
    icon: Users,
    color: "text-orange-500",
  },
  {
    title: "Classes",
    url: "/classes",
    icon: BookOpen,
    color: "text-green-500",
  },
  {
    title: "Subjects",
    url: "/subjects",
    icon: Library,
    color: "text-pink-500",
  },
  {
    title: "Assignments",
    url: "/assignments",
    icon: ClipboardList,
    color: "text-cyan-500",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    color: "text-slate-500",
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Sidebar className="border-r border-primary/5 bg-background/40 backdrop-blur-xl">
        <SidebarHeader className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-primary/10" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-20 rounded bg-primary/5" />
              <div className="h-2 w-12 rounded bg-primary/5" />
            </div>
          </div>
        </SidebarHeader>
      </Sidebar>
    );
  }

  return (
    <Sidebar className="border-r border-primary/5 bg-background/40 backdrop-blur-xl">
      <SidebarHeader className="p-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Calendar className="h-6 w-6" />
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background p-0.5">
              <Sparkles className="h-full w-full text-primary" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground">
              TimeTable
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
              Professional
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "relative h-12 rounded-xl px-4 transition-all duration-300",
                        isActive
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "hover:bg-primary/5 hover:translate-x-1"
                      )}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300",
                            isActive
                              ? "bg-primary/20"
                              : "bg-accent/5 group-hover:bg-accent/10"
                          )}
                        >
                          <item.icon
                            className={cn(
                              "h-4 w-4",
                              isActive
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="active-indicator"
                            className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary/20"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                          >
                            <ChevronRight className="h-3 w-3 text-primary" />
                          </motion.div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="rounded-2xl bg-accent/5 p-4 border border-primary/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-primary/10">
                <AvatarImage src="/avatars/admin.png" />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold truncate">Admin User</span>
              <span className="text-[10px] text-muted-foreground truncate">
                System Administrator
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
            >
              <User className="h-4 w-4 mr-2" />
              <span className="text-xs">Profile</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="text-xs">Exit</span>
            </Button>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
