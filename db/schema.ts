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
