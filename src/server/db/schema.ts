import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  boolean,
  timestamp,
  integer,
  serial,
  pgEnum,
} from "drizzle-orm/pg-core";

export const contentTypeEnum = pgEnum("content_type", [
  "text",
  "image",
  "link",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(), // Using serial for auto-increment
  clerkId: text("clerk_id").unique(), // Clerk ID (string)
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").unique().notNull(),
  photo: text("photo"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  title: text("title").notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const taskComponents = pgTable("taskComponents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  taskId: integer("task_id")
    .notNull()
    .references(() => tasks.id),
  order: integer("order").notNull(),
  content: text("content").notNull(),
  type: contentTypeEnum("type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const pomodoroSessions = pgTable("pomodoroSessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  targetTaskId: integer("targetTask_id").references(() => tasks.id),
  focusDuration: integer("focus_duration").notNull(),
  cyclesNumber: integer("cycles_number").notNull(),
  breakDuration: integer("break_duration").notNull(),
  longBreakDuration: integer("long_break_duration").notNull(),
  wastedTime: integer("wasted_time").notNull(),
  pausedAt: timestamp("paused_at")
    .array()
    .notNull()
    .default(sql`'{}'::timestamp[]`), // Set default value as an empty array
  resumedAt: timestamp("resumed_at")
    .array()
    .notNull()
    .default(sql`'{}'::timestamp[]`), // Set default value as an empty array
  startedAt: timestamp("started_at").defaultNow(),
  endedAt: timestamp("ended_at").defaultNow(),
  isCompleated: boolean("is_compleated").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  darkmode: boolean("darkmode").notNull().default(false),
  defaultFocusDuration: integer("default_focus_duration")
    .notNull()
    .default(1500), // 25 minutes
  defaultBreakDuration: integer("default_break_duration")
    .notNull()
    .default(300), // 5 minutes
  defaultLongBreakDuration: integer("default_long_break_duration")
    .notNull()
    .default(900), // 15 minutes
  defaultCyclesNumber: integer("default_cycles_number").notNull().default(4),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
