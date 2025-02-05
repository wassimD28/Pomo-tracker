"use client";

import { usePomoStore } from "@/src/client/store/usePomoStore";
import { ChevronLast } from "lucide-react";
import { cn } from "@/src/shared/utils/utils";
import { Button } from "@/src/client/components/ui/button";
import PomoPageHeading from "@/src/client/components/features/pomodoro/pageHeading";
import PomoPageHeadingDesc from "@/src/client/components/features/pomodoro/pageHeadingDesc";
import PomoConfirmationButtons from "@/src/client/components/features/pomodoro/pomoConfirmationButtons";
import PomoPageFooter from "@/src/client/components/features/pomodoro/pageFooter";
import BluredCercle from "@/src/client/components/features/pomodoro/bluredCercle";
import CompletePomoPanel from "@/src/client/components/features/pomodoro/completePomoPanel";
import MainPomo from "@/src/client/components/features/pomodoro/mainPomo";
import { useEffect } from "react";
import confetti from "canvas-confetti";
export default function PomodoroPage() {
  const { pomoSession, skipCounting } = usePomoStore();

  // handle confitti effect
  useEffect(() => {
    const triggerConfetti = async () => {
      try {
        if (pomoSession.isCompleted) {
          // Create an array of confetti bursts from different positions
          const confettiBursts = [
            // Left side
            confetti({
              particleCount: 50,
              spread: 90,
              origin: { x: 0, y: 0.5 },
              colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
            }),
            // Right side
            confetti({
              particleCount: 50,
              spread: 90,
              origin: { x: 1, y: 0.5 },
              colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
            }),
            // Top middle
            confetti({
              particleCount: 80,
              spread: 180,
              origin: { x: 0.5, y: 0 },
              colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
            }),
            // Additional bursts with slight delays
            new Promise((resolve) =>
              setTimeout(() => {
                confetti({
                  particleCount: 50,
                  spread: 100,
                  origin: { x: 0.2, y: 0.5 },
                  colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
                });
                resolve(null);
              }, 100),
            ),
            new Promise((resolve) =>
              setTimeout(() => {
                confetti({
                  particleCount: 50,
                  spread: 100,
                  origin: { x: 0.8, y: 0.5 },
                  colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
                });
                resolve(null);
              }, 100),
            ),
          ];

          // Fire all confetti bursts
          await Promise.all(confettiBursts);

        }
      } catch (error) {
        console.error("Failed to trigger confetti:", error);
      }
    };

    triggerConfetti();
  }, [pomoSession.isCompleted]);

  return (
    <div className="pointer-events-auto relative flex h-svh w-full flex-col items-center justify-center overflow-hidden bg-custom-black-500 text-custom-white-300 xl:pl-10">
      {/* blured circle  */}
      <BluredCercle />

      <PomoPageHeading />
      <PomoPageHeadingDesc />
      <PomoConfirmationButtons />

      <MainPomo />
      <PomoPageFooter />
      {/* button to make the remaining time 2 sec immediately (for debugging) */}
      <Button
        onClick={() => {
          skipCounting();
        }}
        className={cn(
          "pointer-events-none absolute -bottom-10 right-4 border border-transparent bg-custom-tomato-400/10 text-custom-tomato-400 opacity-0 backdrop-blur-sm transition-all duration-500 ease-custom-ease hover:border-custom-tomato-400 hover:bg-custom-tomato-400/30 hover:text-custom-tomato-400",
          pomoSession.isFocus &&
            !pomoSession.isPaused &&
            "pointer-events-auto bottom-20 opacity-100",
          pomoSession.isBreak &&
            !pomoSession.isPaused &&
            "pointer-events-auto bottom-20 opacity-100",
          (pomoSession.isFocusComplete || pomoSession.isBreakComplete )&&
            "pointer-events-none -bottom-0 opacity-0",
        )}
      >
        <ChevronLast /> Skip Counting
      </Button>
      <CompletePomoPanel />
    </div>
  );
}
