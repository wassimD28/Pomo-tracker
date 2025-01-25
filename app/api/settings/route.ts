import { SettingsController } from "@/src/server/controllers/settings.controller";
import { authenticateUser } from "@/src/server/middlewares/authenticateUser";
import { errorHandler } from "@/src/server/middlewares/errorHandler";
import { validateOwnership } from "@/src/server/middlewares/validateOwnership";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.use("*", errorHandler);
app.use("*", authenticateUser);

app.get("/api/settings", SettingsController.getSettings)
app.put("/api/settings", validateOwnership("SETTING"), SettingsController.updateSettings);

export const PUT = handle(app);
