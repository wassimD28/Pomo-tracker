import { create } from "zustand";
import { PomoStore } from "@/src/shared/types/interfaces/store.interface";

export const usePomoStore = create<PomoStore>((set) => ({
  pomoSession: {
    target: null,
    cyclesNumber: 4,
    focusDuration: 60,
    breakDuration: 5 * 60,
    longBreakDuration: 15 * 60,
    isPaused: false,
    isStarted: false,
    isCompleted: false,
    pausedAt: [],
    resumedAt: [],
    startedAt: null,
    endedAt: null,
  },
  startPomoSession: (duration, breakDuration) =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        duration,
        breakDuration,
        startedAt: new Date(),
        isStarted: true,
      },
    })),
  pausePomoSession: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        pausedAt: state.pomoSession.pausedAt
          ? [...state.pomoSession.pausedAt, new Date()]
          : [new Date()],
        isPaused: true,
      },
    })),
  resumePomoSession: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        resumedAt: state.pomoSession.resumedAt
          ? [...state.pomoSession.resumedAt, new Date()]
          : [new Date()],
        isPaused: false,
      },
    })),
  endPomoSession: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        endedAt: new Date(),
        isPaused: false,
        isStarted: false,
        isCompleted: true,
      },
    })),
  updateRemainingTime: (remainingTime: number) =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        remainingTime,
      },
    })),
}));
