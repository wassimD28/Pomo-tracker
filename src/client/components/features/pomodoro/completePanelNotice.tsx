import { CircleAlert, Clock, ThumbsUp, AlertTriangle } from "lucide-react";
import { usePomoStore } from "@/src/client/store/usePomoStore";
import { cn } from "@/src/shared/utils/utils";

/**
 * Defines the possible metrics that can receive notices in the completion panel.
 * Each metric provides different insights into the user's Pomodoro session performance.
 */
interface CompletePanelNoticeProps {
  noticeFor:
    | "total_session_duration"
    | "total_focus_duration"
    | "total_break_duration"
    | "wasted_time";
}

/**
 * CompletePanelNotice displays concise feedback messages for different Pomodoro session metrics.
 * It analyzes session data to provide meaningful insights using color-coded messages and icons.
 */
function CompletePanelNotice({ noticeFor }: CompletePanelNoticeProps) {
  // Access the Pomodoro session state from the global store
  const { pomoSession } = usePomoStore();

  // Calculate key performance indicators for the session

  // Percentage of total session time that was wasted (paused)
  const wastedTimePercentage =
  (pomoSession.wastedTime / pomoSession.totalSessionDuration) * 100;

  // Ratio of actual focus time to expected focus time
  // A ratio of 1 means the user maintained focus for the entire expected duration
  const focusEfficiencyRatio =
  pomoSession.totalFocusDuration /
  (pomoSession.focusDuration * pomoSession.cyclesNumber);

  // Calculate the ideal session duration based on settings
  const expectedSessionDuration =
    (pomoSession.focusDuration + pomoSession.breakDuration) *
    pomoSession.cyclesNumber;

  // Ratio of expected time to actual time
  // Higher ratio indicates better time management
  const sessionEfficiencyRatio =
    expectedSessionDuration / pomoSession.totalSessionDuration;

  /**
   * Determines the appropriate notice based on the metric type and performance thresholds.
   * Returns an object containing:
   * - message: A concise feedback message (max 3 words)
   * - icon: The appropriate icon component to display
   * - className: CSS classes for styling (including color coding)
   */
  const getNotice = (): {
    message: string;
    icon: typeof CircleAlert;
    className: string;
  } => {
    // Handle total session duration feedback
    if (noticeFor === "total_session_duration") {
      // Excellent efficiency (≥90%)
      if (sessionEfficiencyRatio >= 0.9) {
        return {
          message: "Perfect Time Management",
          icon: ThumbsUp,
          className: "text-green-400", // Green for positive feedback
        };
      }
      // Good efficiency (≥70%)
      else if (sessionEfficiencyRatio >= 0.7) {
        return {
          message: "Decent Time Usage",
          icon: Clock,
          className: "text-yellow-400", // Yellow for moderate performance
        };
      }
      // Below target efficiency
      else {
        return {
          message: "Improve Time Management",
          icon: AlertTriangle,
          className: "text-red-400", // Red for areas needing improvement
        };
      }
    }

    // Handle focus duration feedback
    else if (noticeFor === "total_focus_duration") {
      // Outstanding focus maintenance (≥95%)
      if (focusEfficiencyRatio >= 0.95) {
        return {
          message: "Exceptional Focus Maintained",
          icon: ThumbsUp,
          className: "text-green-400",
        };
      }
      // Satisfactory focus (≥80%)
      else if (focusEfficiencyRatio >= 0.8) {
        return {
          message: "Good Focus Level",
          icon: Clock,
          className: "text-yellow-400",
        };
      }
      // Focus needs improvement
      else {
        return {
          message: "Focus Needs Work",
          icon: AlertTriangle,
          className: "text-red-400",
        };
      }
    }

    // Handle break duration feedback
    else if (noticeFor === "total_break_duration") {
      // Calculate how well breaks matched the expected duration
      const breakRatio =
        pomoSession.totalBreakDuration /
        (pomoSession.breakDuration * (pomoSession.cyclesNumber - 1));

      // Breaks within 10% of target duration
      if (breakRatio <= 1.1 && breakRatio >= 0.9) {
        return {
          message: "Perfect Break Balance",
          icon: ThumbsUp,
          className: "text-green-400",
        };
      }
      // Breaks longer than recommended
      else if (breakRatio > 1.1) {
        return {
          message: "Breaks Too Long",
          icon: AlertTriangle,
          className: "text-yellow-400",
        };
      }
      // Breaks shorter than recommended
      else {
        return {
          message: "Take Longer Breaks",
          icon: Clock,
          className: "text-red-400",
        };
      }
    }

    // Handle wasted time feedback
    else if (noticeFor === "wasted_time") {
      // Minimal time waste (≤5%)
      if (wastedTimePercentage <= 5) {
        return {
          message: "Minimal Time Lost",
          icon: ThumbsUp,
          className: "text-green-400",
        };
      }
      // Moderate time waste (≤15%)
      else if (wastedTimePercentage <= 15) {
        return {
          message: "Moderate Time Waste",
          icon: Clock,
          className: "text-yellow-400",
        };
      }
      // Significant time waste
      else {
        return {
          message: "High Time Loss",
          icon: AlertTriangle,
          className: "text-red-400",
        };
      }
    }

    // Default return for unknown notice types
    return {
      message: "",
      icon: CircleAlert,
      className: "text-gray-400",
    };
  };

  // Get the appropriate notice for the current metric
  const notice = getNotice();
  // Extract the icon component for use in the render
  const Icon = notice.icon;

  // Render the notice with appropriate styling and icon
  return (
    <div className={cn("flex items-center gap-2 text-end", notice.className)}>
      {notice.message} <Icon className="h-4 w-4" />
    </div>
  );
}

export default CompletePanelNotice;
