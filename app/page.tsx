import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  

  // If user is authenticated, redirect to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  // If user is not authenticated, show the landing page
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] gap-16 bg-custom-black-500 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20 overflow-hidden">
      <main className="row-start-2 flex flex-col items-center gap-8 relative">
      {/* blured circle  */}
      <div className="absolute -top-20 opacity-15 aspect-square w-[800px] rounded-full bg-custom-orange-500 blur-[200px] pointer-events-none" />
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-custom-white-400 text-shadow-glow-sm sm:text-5xl">
            Focus Better, Achieve More
          </h1>
          <p className="mb-8 text-lg text-custom-white-200/30">
            Combine the power of Pomodoro technique with intelligent task
            management to boost your productivity.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/sign-up"
              className="flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-custom-tomato-500 px-6 text-sm text-background shadow-lg transition-colors hover:bg-custom-tomato-400 dark:hover:bg-[#ccc] sm:h-12 sm:px-8 sm:text-base"
            >
              Get Started
            </Link>
            <Link
              href="/sign-in"
              className="flex h-10 items-center justify-center rounded-full border border-solid border-custom-white-300 px-6 text-sm text-custom-white-300 transition-colors hover:bg-[#f2f2f2] hover:text-custom-black-500 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:h-12 sm:px-8 sm:text-base"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 gap-8 text-custom-white-300 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg p-6 bg-custom-white-200/5 dark:border-white/[.145]">
            <h3 className="mb-3 text-xl font-semibold">Pomodoro Timer</h3>
            <p className="text-custom-white-200/40 dark:text-gray-300">
              Stay focused with customizable work sessions and breaks
            </p>
          </div>
          <div className="rounded-lg p-6 bg-custom-white-200/5 dark:border-white/[.145]">
            <h3 className="mb-3 text-xl font-semibold">Task Management</h3>
            <p className="text-custom-white-200/40 dark:text-gray-300">
              Organize your tasks and track progress effortlessly
            </p>
          </div>
          <div className="rounded-lg p-6 bg-custom-white-200/5 dark:border-white/[.145]">
            <h3 className="mb-3 text-xl font-semibold">Analytics</h3>
            <p className="text-custom-white-200/40 dark:text-gray-300">
              Gain insights into your productivity patterns
            </p>
          </div>
        </div>
      </main>

      {/* Footer with minimal info */}
      <footer className="row-start-3 text-center text-sm text-gray-500">
        <p>© 2024 Pomo. All rights reserved.</p>
      </footer>
    </div>
  );
}
