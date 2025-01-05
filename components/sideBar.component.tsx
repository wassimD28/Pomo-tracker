"use client";
import { Link as LinkType } from "@/app/types/interfaces/common.interface";
import {
  CalendarDays,
  Clock,
  LayoutDashboard,
  ListCheck,
  LogOut,
  Settings,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton, useAuth } from "@clerk/nextjs";

export const SideBar = () => {
  const { isLoaded, userId } = useAuth();
  const pathname = usePathname();
  const [links, setLinks] = useState<LinkType[]>([
    { href: "/dashboard", isActive: false, icon: LayoutDashboard },
    { href: "/pomodoro", isActive: false, icon: Clock },
    { href: "/calendar", isActive: false, icon: CalendarDays },
    { href: "/checklist", isActive: false, icon: ListCheck },
  ]);

  // Update active state based on current path
  const handleActiveLink = (clickedHref: string) => {
    setLinks(
      links.map((link) => ({
        ...link,
        isActive: link.href === clickedHref,
      })),
    );
  };

  if (!isLoaded || !userId) {
    return null; // Do not render the sidebar if user is not logged in
  }

  return (
    <div className="fixed z-50 flex h-full flex-col items-center justify-between px-4 py-4 text-custom-white-200">
      <div className="flex flex-col gap-8">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => handleActiveLink(link.href)}
              className={`transition-all duration-200 hover:text-white ${
                isActive ? "text-white" : "text-gray-400 hover:scale-110"
              }`}
            >
              <Icon size={24} />
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col gap-5">
        <SignOutButton>
          <LogOut className="text-gray-400 transition-all duration-200 hover:scale-110 hover:text-white" />
        </SignOutButton>

        <Link
          href="/settings"
          className="text-gray-400 transition-all duration-200 hover:scale-110 hover:text-white"
        >
          <Settings size={24} />
        </Link>
      </div>
    </div>
  );
};
