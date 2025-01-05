// app/page.tsx
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  // If user is not authenticated, show the landing page
  if (!userId) {
    return (
      <div className="bg-custom-black-500 grid min-h-screen grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        <main className="row-start-2 flex flex-col items-center gap-8">
          {/* Hero Section */}
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl text-custom-white-400 text-shadow-glow-sm">
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
                className="flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-custom-tomato-500 shadow-lg shadow-custom-tomato-300/30 px-6 text-sm text-background transition-colors hover:bg-custom-tomato-400 dark:hover:bg-[#ccc] sm:h-12 sm:px-8 sm:text-base"
              >
                Get Started
              </Link>
              <Link
                href="/sign-in"
                className="flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 text-sm transition-colors hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:h-12 sm:px-8 sm:text-base"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-black/[.08] p-6 dark:border-white/[.145]">
              <h3 className="mb-3 text-xl font-semibold">Pomodoro Timer</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Stay focused with customizable work sessions and breaks
              </p>
            </div>
            <div className="rounded-lg border border-black/[.08] p-6 dark:border-white/[.145]">
              <h3 className="mb-3 text-xl font-semibold">Task Management</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Organize your tasks and track progress effortlessly
              </p>
            </div>
            <div className="rounded-lg border border-black/[.08] p-6 dark:border-white/[.145]">
              <h3 className="mb-3 text-xl font-semibold">Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">
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

  // If user is authenticated, show the dashboard or redirect
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 sm:p-20 bg-custom-black-500">
      <main className="row-start-2 flex flex-col gap-8">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="mb-8 text-3xl font-bold">Welcome Back!</h1>

          {/* Quick Actions */}
          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Link
              href="/pomodoro"
              className="rounded-lg border border-black/[.08] p-6 transition-colors hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            >
              <h2 className="mb-2 text-xl font-semibold">Start Pomodoro</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Begin your focused work session
              </p>
            </Link>
            <Link
              href="/checklist"
              className="rounded-lg border border-black/[.08] p-6 transition-colors hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            >
              <h2 className="mb-2 text-xl font-semibold">View Tasks</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Check your to-do list and progress
              </p>
            </Link>
          </div>

          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            className="inline-flex items-center text-lg text-blue-600 hover:underline dark:text-blue-400"
          >
            Go to Dashboard
            <span className="ml-2">→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
