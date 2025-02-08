"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/src/client/styles/calendar.css";
import { usePomodoroSessionQuery } from "@/src/client/api/queries/usePomoSessionQuery";
import { PomodoroSession } from "@/src/shared/types/interfaces/pomodoro.interface";
import { useIsMobile } from "@/src/client/hooks/use-mobile";

// Type definition for our calendar event
interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource: PomodoroSession;
}

// Transform a single PomodoroSession into a calendar event
const transformSessionToEvent = (session: PomodoroSession): CalendarEvent => {
  // If the session hasn't started, we'll use createdAt as fallback
  const start = session.startedAt || session.createdAt;

  // Calculate the total duration of the session
  const totalSessionDuration = calculateTotalDuration(session);

  // Calculate end time by adding the duration to start time
  const end = moment(start).add(totalSessionDuration, "seconds").toDate();

  return {
    id: session.id,
    title: `Pomodoro Session ${session.isCompleted ? "✓" : ""}`,
    start: new Date(start),
    end: new Date(end),
    resource: session,
  };
};

// Calculate the total duration of a session including breaks
const calculateTotalDuration = (session: PomodoroSession): number => {
  const focusTime = session.focusDuration * session.cyclesNumber;
  const regularBreaks = (session.cyclesNumber - 1) * session.breakDuration;
  const longBreaks =
    Math.floor((session.cyclesNumber - 1) / 4) * session.longBreakDuration;
  return focusTime + regularBreaks + longBreaks + session.wastedTime;
};

// Custom event component with proper typing
const EventComponent = ({ event }: { event: CalendarEvent }) => {
  const session = event.resource;
  return (
    <div className="p-1 text-xs">
      <div className="font-semibold">{event.title}</div>
      <div>{`${session.cyclesNumber} cycles`}</div>
    </div>
  );
};

function CalendarComponent() {
  const isMoble = useIsMobile();
  const localizer = momentLocalizer(moment);
  const { data: apiResponse, isLoading, error } = usePomodoroSessionQuery();

  // Transform sessions into calendar events with proper error handling
  const getEvents = (): CalendarEvent[] => {
    // Check if we have a valid API response with data
    if (!apiResponse || !apiResponse.data) {
      console.warn("No sessions data available:", apiResponse);
      return [];
    }

    // Now we know we have the data array
    const sessions = apiResponse.data;

    // Transform sessions to events
    try {
      return Array.isArray(sessions)
        ? sessions.map(transformSessionToEvent)
        : [transformSessionToEvent(sessions)]; // Handle single session case
    } catch (err) {
      console.error("Error transforming sessions to events:", err);
      return [];
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading sessions...
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        Error loading sessions. Please try again later.
      </div>
    );
  }

  // Get events with error handling
  const events = getEvents();

  return (
    <div className="h-full w-full px-2 pt-4">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        className="h-full w-full"
        views={["month", "week", "day"]}
        style={{ backgroundColor: "transparent" }}
        defaultView={isMoble ? "day" : "week"}
        events={events}
        components={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          event: EventComponent as any,
        }}
        tooltipAccessor={(event: CalendarEvent) => {
          const session = event.resource;
          return `Duration: ${moment
            .duration(calculateTotalDuration(session), "seconds")
            .humanize()}
                  Cycles: ${session.cyclesNumber}
                  Status: ${session.isCompleted ? "Completed" : "Incomplete"}`;
        }}
      />
    </div>
  );
}
export default CalendarComponent;
