import { usePomoStore } from "@/src/client/store/usePomoStore";
import { cn } from "@/src/shared/utils/utils";
import { Pause, Play } from "lucide-react";
import EndSessionDialog from "./endSessionDialog";
import { useCreatePomodoroSession } from "@/src/client/api/mutations/pomodoro-session/useCreatePomoSession";
import { useUserContext } from "@/src/client/providers/userProvider";
import { useUpdatePomodoroSession } from "@/src/client/api/mutations/pomodoro-session/useUpdatePomoSession";
import { useState } from "react";
import { PomodoroSession } from "@/src/shared/types/interfaces/pomodoro.interface";
import { useTaskSearchBarStore } from "@/src/client/store/useTaskSearchBarStore";

function MainPomoButtons() {
  const { isSearching } = useTaskSearchBarStore();
  // Local state to store the current session ID
  const [currentSession, setCurrentSession] = useState<PomodoroSession | null>(
    null,
  );

  const { pomoSession, startPomoSession, pausePomoSession, resumePomoSession, endPomoSession, resetPomoSession } =
    usePomoStore();

  const createPomoSession = useCreatePomodoroSession();
  // Initialize update mutation with current session
  const updatePomoSession = useUpdatePomodoroSession();
  const { user } = useUserContext();

  const handleStartPomoSession = () => {
    startPomoSession();

    const sessionData = {
      userId: user?.id,
      targetTaskId: pomoSession.target?.id || null,
      focusDuration: pomoSession.focusDuration,
      cyclesNumber: pomoSession.cyclesNumber,
      breakDuration: pomoSession.breakDuration,
      longBreakDuration: pomoSession.longBreakDuration,
      wastedTime: pomoSession.wastedTime,
      pausedAt: [],
      resumedAt: [],
    };

    // Create session and store the response
    createPomoSession.mutate(sessionData, {
      onSuccess: (response) => {
        // Store the created session in local state
        setCurrentSession(response.data);
      },
      onError: (error) => {
        console.error("Failed to create Pomodoro session:", error);
        alert(
          "An error occurred while starting the session. Please try again.",
        );
      },
    });
  };

  const handlePauseSession = () => {
    if (!currentSession) {
      console.error("No active session found");
      return;
    }

    // Get the current state before updating
    const currentPausedAt = usePomoStore.getState().pomoSession.pausedAt;
    pausePomoSession();

    const updatedData = {
      pausedAt: [...currentPausedAt, new Date()], // Use the latest state
    };

    updatePomoSession.mutate(
      { id: currentSession.id, ...updatedData },
      {
        onSuccess: (response) => {
          setCurrentSession(response.data);
        },
        onError: (error) => {
          console.error("Failed to pause session:", error);
          alert("Failed to pause session. Please try again.");
        },
      },
    );
  };
  const handleEndSession = () => {
    if (!currentSession) {
      console.error("No active session found");
      return;
    }

    endPomoSession();

    const updatedData : Partial<PomodoroSession> = {
      wastedTime: pomoSession.wastedTime,
      isEnded: true,
      endedAt:  new Date(),
    };
    resetPomoSession();

    updatePomoSession.mutate(
      { id: currentSession.id, ...updatedData },
      {
        onSuccess: (response) => {
          setCurrentSession(response.data);
        },
        onError: (error) => {
          console.error("Failed to pause session:", error);
          alert("Failed to pause session. Please try again.");
        },
      },
    );
  };

  const handleResumeSession = () => {
    if (!currentSession) {
      console.error("No active session found");
      return;
    }

    const currentResumedAt = usePomoStore.getState().pomoSession.resumedAt;
    resumePomoSession();

    const updatedData = {
      resumedAt: [...currentResumedAt, new Date()],
    };

    updatePomoSession.mutate(
      { id: currentSession.id, ...updatedData },
      {
        onSuccess: (response) => {
          setCurrentSession(response.data);
        },
        onError: (error) => {
          console.error("Failed to resume session:", error);
          alert("Failed to resume session. Please try again.");
        },
      },
    );
  };

  return (
    <div
      className={cn(
        "absolute bottom-28 flex w-0 items-center justify-center rounded-full bg-gradient-to-b from-custom-tomato-400 to-custom-tomato-600 px-14 py-10 font-bold uppercase text-custom-white-500 opacity-100 shadow-xl shadow-black/20 duration-500 ease-custom-ease text-shadow-glow-sm max-sm:bottom-44 transition-all",
        pomoSession.isStarted && "bottom-24 w-44 max-sm:bottom-24",
        pomoSession.isPaused && "from-custom-maroon-400 to-custom-maroon-600",
        pomoSession.isBreak && "from-green-500 to-green-800",
        pomoSession.isCompleted &&
          "bottom-96 from-green-500 to-green-800 opacity-0",
        (pomoSession.isFocusComplete || pomoSession.isBreakComplete) &&
          "opacity-0",
          isSearching &&" translate-y-20 opacity-0 pointer-events-none"
      )}
    >
      <Play
        onClick={handleStartPomoSession}
        strokeLinecap="round"
        className={cn(
          "pointer-events-auto absolute scale-[2] cursor-pointer fill-custom-white-200 stroke-custom-white-200 opacity-100 hover:fill-custom-white-600 hover:stroke-custom-white-600",
          pomoSession.isStarted && "pointer-events-none opacity-0",
        )}
      />
      {/* Resume pomo button */}
      <Play
        onClick={handleResumeSession}
        strokeLinecap="round"
        className={cn(
          "pointer-events-none absolute scale-[2] cursor-pointer fill-custom-white-200 stroke-custom-white-200 opacity-0 hover:fill-custom-white-600 hover:stroke-custom-white-600",
          pomoSession.isStarted &&
            pomoSession.isPaused &&
            "pointer-events-auto left-10 opacity-100",
        )}
      />
      <Pause
        onClick={handlePauseSession}
        strokeLinecap="round"
        className={cn(
          "pointer-events-none absolute scale-[2] cursor-pointer fill-custom-white-200 stroke-custom-white-200 opacity-0 hover:fill-custom-white-600 hover:stroke-custom-white-600",
          pomoSession.isStarted &&
            !pomoSession.isPaused &&
            "pointer-events-auto left-10 opacity-100",
        )}
      />
      <EndSessionDialog onEndSession={handleEndSession} />
    </div>
  );
}

export default MainPomoButtons;
