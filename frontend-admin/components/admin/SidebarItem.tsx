'use client'

import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
  badge?: number;
  collapsed?: boolean;
}

export default function SidebarItem({ 
  title, 
  href, 
  icon: Icon, 
  active = false, 
  badge, 
  collapsed = false 
}: SidebarItemProps) {
  const content = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
        active 
          ? "bg-gradient-to-r from-rose-500 to-pink-400 text-white shadow-md" 
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white",
        collapsed && "justify-center px-2"
      )}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0", active ? "text-white" : "text-gray-600 dark:text-gray-400")} />
      
      {!collapsed && (
        <>
          <span className="flex-1">{title}</span>
          {badge && badge > 0 && (
            <Badge 
              variant="destructive" 
              className="h-5 w-5 p-0 text-xs rounded-full flex items-center justify-center bg-red-500 text-white"
            >
              {badge > 99 ? "99+" : badge}
            </Badge>
          )}
        </>
      )}
      
      {collapsed && badge && badge > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs rounded-full flex items-center justify-center bg-red-500 text-white border-2 border-white"
        >
          {badge > 9 ? "9+" : badge}
        </Badge>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="right" className="ml-2">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}