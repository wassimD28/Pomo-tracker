import { create } from "zustand";
import { PomoStore } from "@/src/shared/types/interfaces/store.interface";

export const usePomoStore = create<PomoStore>((set) => ({
  pomoSession: {
    target: null,
    currentCycle: 0,
    cyclesNumber: 4,
    totalSessionDuration: 0,
    focusDuration: 25 * 60,
    breakDuration: 5 * 60,
    longBreakDuration: 15 * 60,
    remainingTime: 25 * 60,
    currentFocusDuration: 0,
    currentBreakDuration: 0,
    totalFocusDuration: 0,
    totalBreakDuration: 0,
    wastedTime: 0,
    isFocus: false,
    isBreakComplete: false,
    isFocusComplete: false,
    isPaused: false,
    isStarted: false,
    isCompleted: false,
    skipCounting: false,
    isBreakSkipped: false,
    isBreak: false,
    isEnded: false,
    pausedAt: [],
    resumedAt: [],
    startedAt: null,
    endedAt: null,
  },
  updateTotalSessionDuration: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        totalSessionDuration:
          state.pomoSession.totalFocusDuration +
          state.pomoSession.totalBreakDuration +
          state.pomoSession.wastedTime,
      },
    })),
  updateWastedTime: (newDuration: number) =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        wastedTime: newDuration,
      },
    })),
  startFocus: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        isBreak: false,
        isFocusComplete: false,
        isBreakComplete: false,
        isBreakSkipped: false,
        isFocus: true,
        skipCounting: false,
      },
    })),
  endFocus: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        isBreak: false,
        isFocusComplete: true,
        isBreakComplete: false,
        isFocus: false,
        skipCounting: false,
      },
    })),
  resetPomoSession: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        // will reset
        target: null,
        wastedTime: 0,
        currentCycle: 0,
        totalSessionDuration: 0,
        currentBreakDuration: 0,
        currentFocusDuration: 0,
        totalBreakDuration: 0,
        totalFocusDuration: 0,
        isFocus: false,
        isBreakSkipped: false,
        skipCounting: false,
        isBreakComplete: false,
        isFocusComplete: false,
        isPaused: false,
        isStarted: false,
        isCompleted: false,
        isBreak: false,
        isEnded: false,
        pausedAt: [],
        resumedAt: [],
        startedAt: null,
        endedAt: null,
      },
    })),
  updateCurrentFocusDuration: (remainingTime: number) =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        currentFocusDuration: state.pomoSession.focusDuration - remainingTime,
      },
    })),
  updateCurrentBreakDuration: (remainingTime: number) =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        currentBreakDuration: state.pomoSession.breakDuration - remainingTime,
      },
    })),
  updateTotalFocusDuration: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        totalFocusDuration:
          state.pomoSession.totalFocusDuration +
          state.pomoSession.currentFocusDuration,
      },
    })),
  updateTotalBreakDuration: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        totalBreakDuration:
          state.pomoSession.totalBreakDuration +
          state.pomoSession.currentBreakDuration,
      },
    })),
  endBreakDuration: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        isBreak: false,
        isBreakComplete: true,
        skipCounting: false,
        isBreakSkipped: false,
      },
    })),
  skipBreakDuration: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        currentBreakDuration: 0,
        isFocusComplete: false,
        isBreak: false,
        isBreakComplete: true,
        isBreakSkipped: true,
        isPaused: false,
        skipCounting: false,
        isFocus: false,
      },
    })),
  endFocusSession: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        isFocusComplete: true,
        isPaused: false,
        skipCounting: false,
      },
    })),
  updateCurrentCycle: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        currentCycle: state.pomoSession.currentCycle + 1,
      },
    })),
  setPomoSessionData: (data) =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        ...data,
        remainingTime: data.focusDuration,
        isStarted: false,
        isCompleted: false,
      },
    })),
  startPomoSession: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        startedAt: new Date(),
        isStarted: true,
        isFocus: true,
      },
    })),
  startBreakSession: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        isPaused: false,
        isFocusComplete: false,
        isBreak: true,
        isCompleted: false,
        isBreakSkipped: false,
        isFocus: false,
        skipCounting: false,
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
        currentCycle: 0,
        isFocus: false,
        isBreak: false,
        skipCounting: false,
        isBreakComplete: false,
        isFocusComplete: false,
        isPaused: false,
        isStarted: false,
        isCompleted: false,
        isEnded: true,
      },
    })),
  completePomoSession: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        endedAt: new Date(),
        currentCycle: 0,
        isFocus: false,
        isBreak: false,
        skipCounting: false,
        isBreakComplete: false,
        isFocusComplete: false,
        isPaused: false,
        isStarted: false,
        isCompleted: true,
        isEnded: true,
      },
    })),
  updateRemainingTime: (remainingTime: number) =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        remainingTime,
      },
    })),
  skipCounting: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        skipCounting: true,
      },
    })),
}));
