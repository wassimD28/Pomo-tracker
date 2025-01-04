"use client";

import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/calendar.css";
import { useState } from "react";

// Define the event type
interface CalendarEvent extends Omit<Event, "title"> {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  category?: "work" | "personal" | "meeting";
}

export const CalendarComponent = () => {
  const localizer = momentLocalizer(moment);

  // Sample events - replace with your actual events data
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Team Meeting",
      start: moment().set({ hour: 10, minute: 0 }).toDate(),
      end: moment().set({ hour: 11, minute: 30 }).toDate(),
      category: "meeting",
    },
    {
      id: "2",
      title: "Project Deadline",
      start: moment().add(2, "days").toDate(),
      end: moment().add(2, "days").toDate(),
      category: "work",
    },
  ]);

  // Handle event selection with type safety
  const handleEventSelect = (event: CalendarEvent) => {
    if (!event) return;
    console.log("Selected event:", event);
    // Add your event selection logic here
  };

  // Handle event creation from calendar slot selection
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    if (!start || !end) return;

    const title = window.prompt("Enter event title:");
    if (title) {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title,
        start,
        end,
        category: "personal",
      };
      setEvents((prev) => [...prev, newEvent]);
    }
  };

  // Custom event styling based on category with type safety
  const eventStyleGetter = (event: CalendarEvent | undefined) => {
    if (!event?.category) {
      return {
        style: {
          backgroundColor: "rgba(255, 166, 0, 0.8)",
          border: "none",
          borderRadius: "4px",
        },
      };
    }

    let backgroundColor = "rgba(255, 166, 0, 0.8)"; // default orange

    switch (event.category) {
      case "work":
        backgroundColor = "rgba(54, 162, 235, 0.8)"; // blue
        break;
      case "meeting":
        backgroundColor = "rgba(255, 99, 132, 0.8)"; // red
        break;
      case "personal":
        backgroundColor = "rgba(75, 192, 192, 0.8)"; // green
        break;
    }

    return {
      style: {
        backgroundColor,
        border: "none",
        borderRadius: "4px",
      },
    };
  };

  return (
    <div className="h-full w-full p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="h-full"
        views={["month", "week", "day"]}
        selectable
        onSelectEvent={(event) => handleEventSelect(event as CalendarEvent)}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={(event) => eventStyleGetter(event as CalendarEvent)}
        style={{
          backgroundColor: "transparent",
          color: "white",
        }}
        defaultView="week"
      />
    </div>
  );
};
