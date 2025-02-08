"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useTodaySessions } from "@/src/client/api/queries/useTodayPomoSessionsQuery";
import { usePomoStore } from "@/src/client/store/usePomoStore";
import { formatToNaturalTime } from "@/src/shared/utils/utils";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import FocusPercentageItem from "./focusPercentageItem";
import { PomodoroSessionWithDetails } from "@/src/shared/types/interfaces/common.interface";


export const PomodoroSamary = () => {
  const { pomoSession } = usePomoStore();
  const { data: todaySessions, isLoading, refetch } = useTodaySessions();
  const [totalFocusDurationToday, setTotalFocusDurationToday] = useState(0);
  const todaySessionsData = todaySessions?.data as PomodoroSessionWithDetails[];
  

  // Aggregate sessions by category and calculate total durations
  const aggregatedCategories = useMemo(() => {
    if (!todaySessionsData?.length) return [];

    // Create a map to store category totals
    const categoryMap = new Map<string, number>();

    // Sum up focus durations for each category
    todaySessionsData.forEach((session) => {
      const categoryName = session.task?.category.name || "Uncategorized";
      const currentDuration = session.session.totalFocusDuration ?? 0;
      const existingDuration = categoryMap.get(categoryName) ?? 0;
      categoryMap.set(categoryName, existingDuration + currentDuration);
    });

    // Calculate total duration for percentage calculations
    const totalDuration = Array.from(categoryMap.values()).reduce(
      (sum, duration) => sum + duration,
      0,
    );

    // Convert map to array, calculate percentages, and sort by duration
    return Array.from(categoryMap.entries())
      .map(([categoryName, totalFocusDuration]) => ({
        categoryName,
        totalFocusDuration,
        focusPercentage:
          totalDuration > 0 ? (totalFocusDuration / totalDuration) * 100 : 0,
      }))
      .sort((a, b) => b.totalFocusDuration - a.totalFocusDuration);
  }, [todaySessionsData]);

  // Calculate total focus duration across all categories
  const totalFocusDurationSum = useMemo(() => {
    return aggregatedCategories.reduce(
      (sum, category) => sum + category.totalFocusDuration,
      0,
    );
  }, [aggregatedCategories]);

  // Effect to handle session completion and refetch data
  useEffect(() => {
    if (pomoSession.isCompleted || pomoSession.isEnded) {
      const timeoutId = setTimeout(() => {
        refetch();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [pomoSession.isCompleted, pomoSession.isEnded, refetch]);

  // Effect to calculate total focus duration including current session
  useEffect(() => {
    const currentSessionDuration =
      pomoSession.isStarted && !pomoSession.isCompleted && !pomoSession.isEnded
        ? pomoSession.totalFocusDuration
        : 0;

    setTotalFocusDurationToday(currentSessionDuration + totalFocusDurationSum);
  }, [
    totalFocusDurationSum,
    pomoSession.totalFocusDuration,
    pomoSession.isStarted,
    pomoSession.isCompleted,
    pomoSession.isEnded,
  ]);

  return (
    <div
      id="pomodoro_history"
      className="relative flex items-center justify-center overflow-hidden rounded-xl bg-custom-maroon-700"
    >
      <div className="absolute z-30 max-sm:left-6 right-10 top-32 flex max-h-36 flex-col items-start justify-start gap-2">
        {aggregatedCategories.length ? (
          aggregatedCategories.map((category) => (
            <FocusPercentageItem
              key={category.categoryName}
              focusPercentage={category.focusPercentage}
              categoryName={category.categoryName}
              duration={category.totalFocusDuration} // Pass the actual duration for each category
            />
          ))
        ) : (
          <div className="self-center align-middle text-sm text-custom-white-500/50">
            No sessions today
          </div>
        )}
      </div>
      {/* blured circle */}
      <div className="absolute left-0 aspect-square w-56 rounded-full bg-custom-tomato-400 blur-[100px] max-sm:-left-[20%] max-sm:-top-[20%] max-sm:col-span-1" />
      <Image
        className="absolute left-4 z-20 max-sm:-bottom-[5%] max-sm:left-[65%] max-sm:blur-sm"
        src="/tomato-icon.svg"
        alt="tomato icon"
        width={180}
        height={38}
        priority
      />
      {/* text */}
      <div className="absolute right-10 top-8 flex flex-col max-sm:left-4 max-sm:top-3">
        <h1 className="text-6xl font-bold capitalize text-custom-white-500 max-sm:w-96">
          good job
        </h1>
        {isLoading ? (
          <Skeleton className="h-4 w-full opacity-20" />
        ) : (
          <p className="pl-2 text-sm capitalize text-custom-white-500/50">
            {`You have focused for ${formatToNaturalTime(
              totalFocusDurationToday,
            )} today`}
          </p>
        )}
      </div>
    </div>
  );
};
