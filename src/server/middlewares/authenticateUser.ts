import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { auth } from "@clerk/nextjs/server";
import { UserRepository } from "../repositories/userRepo";


export const authenticateUser = async (
  c: Context,
  next: () => Promise<void>,
) => {
  try {
    // Wait for the auth promise to resolve
    const session = await auth();
    const clerkId = session?.userId;

    if (!clerkId) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }
    // set clerkId
    c.set("clerkId", clerkId);

    // Fetch user from the database based on the Clerk ID
    const user = await UserRepository.getUserByClerkId(clerkId);
    if (!user) {
      throw new HTTPException(404, { message: "User not found" });
    }
    // Set userId in context for use in controllers
    c.set("userId", user.id);
    console.log(`__________________\nauthenticated user id : ${user.id}, type : ${typeof user.id}\n______________`);
    
    await next();
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error;
    }
    console.error("Authentication error:", error);
    throw new HTTPException(500, {
      message: "Internal server error during authentication",
    });
  }
};
