// app/api/hello/route.ts
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api/hello");

app.get("/", (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

export const GET = handle(app);
