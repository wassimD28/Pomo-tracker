import { SettingsController } from "@/src/server/controllers/settings.controller";
import { authenticateUser } from "@/src/server/middlewares/authenticateUser";
import { errorHandler } from "@/src/server/middlewares/errorHandler";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.use("*", errorHandler);
app.use("*", authenticateUser);

app.get("/api/settings", SettingsController.getSettings)
app.put("/api/settings", SettingsController.updateSettings);

export const PUT = handle(app);
export const GET = handle(app);
