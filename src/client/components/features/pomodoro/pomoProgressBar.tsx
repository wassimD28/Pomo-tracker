import React, { useEffect } from "react";
import { usePomoStore } from "../../../store/usePomoStore";
import { cn, formatTime } from "@/src/shared/utils/utils";
import { useTimer } from "react-timer-hook";

const PomodoroProgress = ({
  size = 520, // SVG width/height
  strokeWidth = 25, // Progress bar thickness
}) => {
  const { pomoSession, endPomoSession, updateRemainingTime } = usePomoStore();

  const timer = useTimer({
    expiryTimestamp: new Date(), // Default value doesn't matter
    onExpire: () => endPomoSession(),
    autoStart: false,
  });

  useEffect(() => {
    if (pomoSession.isStarted) {
      const expiryTime = new Date();
      const durationInSeconds = pomoSession.duration;
      expiryTime.setSeconds(expiryTime.getSeconds() + durationInSeconds);
      timer.restart(expiryTime);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pomoSession.isStarted, pomoSession.duration]);

  useEffect(() => {
    if (pomoSession.isStarted && pomoSession.isPaused) {
      updateRemainingTime(remainingTime);
      timer.pause();
    }
    if (pomoSession.isStarted && !pomoSession.isPaused) {
      timer.resume();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pomoSession.isPaused]);

  const center = size / 2;
  const radius = size / 2 - strokeWidth * 2;
  const circumference = 2 * Math.PI * radius;

  let remainingTime: number;
  const getProgress = () => {
    const totalDuration = pomoSession.duration;
    remainingTime = timer.minutes * 60 + timer.seconds;
    const progress = (remainingTime / totalDuration) * 100;
    return circumference - (progress / 100) * circumference;
  };

  return (
    <div className="absolute flex items-center justify-center">
      <svg
        style={{
          width: size,
          height: size,
          transform: "rotate(-90deg)",
        }}
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          {/* Define the gradient */}
          <linearGradient id="progressGradient" gradientTransform="rotate(0)">
            <stop offset="0%" stopColor="#cc6e28" /> {/* Light salmon */}
            <stop offset="100%" stopColor="#ff8932" /> {/* Tomato red */}
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite
              in="blur"
              in2="SourceGraphic"
              operator="over"
              result="glow"
            />
            <feFlood floodColor="#FF6347" floodOpacity="0.5" />
            <feComposite in2="glow" operator="in" />
            <feBlend in="SourceGraphic" mode="screen" />
          </filter>
        </defs>

        {/* Progress circle with gradient */}
        <circle
          className={cn(
            "opacity-0 duration-1000 ease-custom-ease",
            pomoSession.isStarted && "opacity-100",
            pomoSession.isPaused && "opacity-80",
          )}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={getProgress()}
          style={{ stroke: "url(#progressGradient)", filter: "url(#glow)" }}
        />
      </svg>
      {/* Timer text */}
      <h1
        className={cn(
          "absolute select-none bg-gradient-to-b from-custom-white-200 to-custom-white-600 bg-clip-text text-9xl font-bold text-transparent",
          !pomoSession.isStarted && "top-44",
        )}
      >
        {pomoSession.isStarted
          ? formatTime(timer.minutes * 60 + timer.seconds)
          : formatTime(pomoSession.duration)}
      </h1>
    </div>
  );
};

export default PomodoroProgress;
