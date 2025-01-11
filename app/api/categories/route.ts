import { Hono } from "hono";
import { handle } from "hono/vercel";
import { CategoryController } from "@/lib/controllers/category.controller";
import { authenticateUser } from "@/lib/middlewares/authenticateUser";
import { errorHandler } from "@/lib/middlewares/errorHandler";

const app = new Hono();

app.use("*", errorHandler)

// Apply authentication to all routes
app.use("*", authenticateUser);


// Only keep the routes that don't need an ID
app.get("/api/categories", CategoryController.getCategories);
app.post("/api/categories", CategoryController.createCategory);

export const GET = handle(app);
export const POST = handle(app);
