import { create } from "zustand";
import { PomoStore } from "@/src/shared/types/interfaces/store.interface";

export const usePomoStore = create<PomoStore>((set) => ({
  pomoSession: {
    target: null,
    currentCycle: 1,
    cyclesNumber: 4,
    focusDuration: 25 * 60,
    breakDuration: 5 * 60,
    longBreakDuration: 15 * 60,
    remainingTime: 25 * 60,
    wastedTime: 0,
    isFocus: false,
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
  startFocus: ()=>set((state)=>({
    pomoSession: {
     ...state.pomoSession,
      isBreak: false,
      isFocusComplete: false,
      isBreakComplete: false,
      isFocus: true,
    },
  })),
  resetPomoSession: () =>set((state) => ({
    pomoSession: {
      ...state.pomoSession,
      // will reset
      target: null,
      wastedTime: 0,
      currentCycle: 1,
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
  endBreakDuration: () =>set((state)=>({
    pomoSession: {
     ...state.pomoSession,
      isBreak: false,
    },
  })),
  skipBreakDuration: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        isFocusComplete: false,
        isBreak: false,
        isBreakComplete: true,
        isPaused: false,
      },
    })),
  endFocusSession: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        isFocusComplete: true,
        isPaused: false,
      },
    })),
  updateCurrentCycle: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        currentCycle:
          // if currentCycle equals cycles number that means the session has completed , reset the current cycle to 1, else increament it
          state.pomoSession.currentCycle === state.pomoSession.cyclesNumber
            ? 1
            : state.pomoSession.currentCycle + 1,
      },
    })),
  setPomoSessionData: (data) =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        ...data,
        remainingTime: data.focusDuration,
        wastedTime: 0,
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
        isFocus: true
      },
    })),
  startBreakSession: () =>
    set((state) => ({
      pomoSession: {
        ...state.pomoSession,
        isFocusComplete: false,
        isBreak: true,
        isCompleted: false,
        isFocus: false,
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
        isFocus: false,
        isBreak: false,
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
}));
