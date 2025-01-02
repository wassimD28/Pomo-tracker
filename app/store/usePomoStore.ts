import { create } from "zustand";
import { PomoStore } from "../types/interfaces/common.interface";

export const usePomoStore = create<PomoStore>((set) => ({
  pomoSession: {
    target: null,
    duration: 25,
    breakDuration: 5,
    isPaused: false,
    pausedAt: null,
    resumedAt: null,
    startedAt: null,
    endedAt: null,
  },
  startPomoSession: (note, duration, breakDuration) =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        target: note,
        duration,
        breakDuration,
        startedAt: new Date(),
        isPaused: false,
        pausedAt: null,
        resumedAt: null,
        endedAt: null,
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
      },
    })),
}));
