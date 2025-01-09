import { UserController } from "@/lib/controllers/user.controller";
import { authenticateUser } from "@/lib/middlewares/authenticateUser";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api/user");

// Global error handling
app.use("*", async (c, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json(
        {
          status: "error",
          message: error.message,
        },
        error.status,
      );
    }
    console.error(error);
    return c.json(
      {
        status: "error",
        message: "Internal Server Error",
      },
      500,
    );
  }
});

app.use("*", authenticateUser);

// Routes
app.get("/", UserController.getUserByClerkId);

export const GET = handle(app);