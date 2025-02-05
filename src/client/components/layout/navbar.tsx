"use client";
import { Link as LinkType } from "@/src/shared/types/interfaces/common.interface";
import {
  CalendarDays,
  Clock,
  LayoutDashboard,
  ListCheck,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/client/components/ui/dropdown-menu";
import { useIsMobile } from "../../hooks/use-mobile";
import { cn } from "@/src/shared/utils/utils";
import { useSettingsStore } from "../../store/useSettingsStore";
import SettingsDialog from "./dialogs/settings.dialog";

export const NavBar = () => {
  const { setSettingDialogOpen } = useSettingsStore();
  const isMobile = useIsMobile();
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();

  
  const pathname = usePathname();
  const [links, setLinks] = useState<LinkType[]>([
    {
      href: "/dashboard",
      name: "Dashbord",
      isActive: false,
      icon: LayoutDashboard,
    },
    { href: "/pomodoro", name: "Pomodoro", isActive: false, icon: Clock },
    {
      href: "/calendar",
      name: "Calendar",
      isActive: false,
      icon: CalendarDays,
    },
    { href: "/tasks", name: "Tasks", isActive: false, icon: ListCheck },
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

  if (isMobile)
    return (
      <div className="pointer-events-auto fixed bottom-0 z-50 w-full">
        <div className="pointer-events-auto mx-auto flex h-16 w-[95%] flex-row items-center justify-between rounded-3xl rounded-b-none bg-custom-black-400/50 px-1 pb-2 pt-2 backdrop-blur-sm duration-500 ease-custom-ease">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                href={link.href}
                key={link.href}
                onClick={() => handleActiveLink(link.href)}
                className={cn(
                  "flex h-full items-center gap-1 px-2 text-sm font-semibold text-custom-white-500/60 duration-500 ease-custom-ease",
                  isActive &&
                    "rounded-full bg-custom-white-500 px-4 text-custom-black-700",
                )}
              >
                <Icon size={24} />
                <h1
                  className={cn(
                    "w-0 opacity-0 duration-500 ease-custom-ease",
                    isActive && "w-fit opacity-100",
                  )}
                >
                  {link.name}
                </h1>
              </Link>
            );
          })}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <User
                className="mx-2 h-full cursor-pointer font-semibold text-custom-white-500/60"
                size={24}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="mb-4 border-none bg-custom-white-200/20 text-custom-white-200 backdrop-blur-md"
              side="right"
            >
              <DropdownMenuLabel>
                <div className="grid grid-cols-[35px_1fr] items-center gap-2">
                  <Image
                    src={user?.imageUrl || "/default-avatar-image.jpg"}
                    alt="User profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                    unoptimized // keep this or you'll get hydration error
                  />
                  <div className="flex flex-col gap-0.5">
                    <h1 className="font-normal">{`${user?.firstName} ${user?.lastName}`}</h1>
                    <p className="text-xs font-normal opacity-40">
                      {user?.emailAddresses[0].emailAddress}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="opacity-10" />
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem
                  value="settings"
                  className="flex w-full cursor-pointer items-center gap-4 rounded-md px-2 py-2 text-custom-white-100/60 data-[highlighted]:bg-custom-white-200/10 data-[highlighted]:text-custom-white-100/90"
                  onClick={() => setSettingDialogOpen(true)}
                >
                  <Settings size={20} />
                  <h2>Settings</h2>
                </DropdownMenuRadioItem>
                <SignOutButton signOutOptions={{ redirectUrl: "/sign-in" }}>
                  <DropdownMenuRadioItem
                    className="flex w-full cursor-pointer items-center gap-4 rounded-md px-2 py-2 text-custom-white-100/60 data-[highlighted]:bg-custom-white-200/10 data-[highlighted]:text-custom-white-100/90"
                    value="logout"
                  >
                    <LogOut size={20} />
                    <h2>Logout</h2>
                  </DropdownMenuRadioItem>
                </SignOutButton>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <SettingsDialog />
        </div>
      </div>
    );

  return (
    <div className="pointer-events-auto fixed z-50 flex h-full w-fit flex-col items-center justify-between px-4 py-8 text-custom-white-200">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src={user?.imageUrl || "/default-avatar-image.jpg"}
              alt="User profile"
              width={30}
              height={30}
              className="cursor-pointer rounded-full"
              unoptimized // keep this or you'll get hydration error
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="mb-4 border-none bg-custom-white-200/20 text-custom-white-200 backdrop-blur-md"
            side="right"
          >
            <DropdownMenuLabel>
              <div className="grid grid-cols-[35px_1fr] items-center gap-2">
                <Image
                  src={user?.imageUrl || "/default-avatar-image.jpg"}
                  alt="User profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                  unoptimized // keep this or you'll get hydration error
                />
                <div className="flex flex-col gap-0.5">
                  <h1 className="font-normal">{`${user?.firstName} ${user?.lastName}`}</h1>
                  <p className="text-xs font-normal opacity-40">
                    {user?.emailAddresses[0].emailAddress}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="opacity-10" />
            <DropdownMenuRadioGroup>
              <DropdownMenuRadioItem
                value="settings"
                className="flex w-full cursor-pointer items-center gap-4 rounded-md px-2 py-2 text-custom-white-100/60 data-[highlighted]:bg-custom-white-200/10 data-[highlighted]:text-custom-white-100/90"
                onClick={() => setSettingDialogOpen(true)}
              >
                <Settings size={20} />
                <h2>Settings</h2>
              </DropdownMenuRadioItem>
              <SignOutButton>
                <DropdownMenuRadioItem
                  className="flex w-full cursor-pointer items-center gap-4 rounded-md px-2 py-2 text-custom-white-100/60 data-[highlighted]:bg-custom-white-200/10 data-[highlighted]:text-custom-white-100/90"
                  value="logout"
                >
                  <LogOut size={20} />
                  <h2>Logout</h2>
                </DropdownMenuRadioItem>
              </SignOutButton>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <SettingsDialog />
      </div>
    </div>
  );
};
