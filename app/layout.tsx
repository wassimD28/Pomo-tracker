import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/src/client/components/layout/navbar";
import QueryProvider from "@/src/client/providers/queryProvider";
import { SettingsProvider } from "@/src/client/providers/settingsProvider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pomo Tracker",
  description:
    "Pomo Tracker is a free, open-source pomodoro timer app that helps you stay focused with 25-minute work intervals and short breaks. You can also make tasks and link them to your pomodoro sessions. Log in with Google to track your progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        className="pointer-events-none relative z-0 overflow-visible"
        lang="en"
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} pointer-events-auto relative z-10 antialiased`}
        >
          <QueryProvider>
            <SettingsProvider>
              <NavBar />
              {children}
              <Toaster />
            </SettingsProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
