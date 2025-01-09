import { Context } from "hono";
import { UserRepository } from "../repositories/userRepo";
import { HTTPException } from "hono/http-exception";

export class UserController {
  static async getUserById(c: Context) {
    try {
      const userId = c.get("userId");
      // get the user
      const user = await UserRepository.getUserById(userId)
      return c.json(
        {
          status: "success",
          data: user,
        },
        201,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new HTTPException(500, { message: "Failed to fetch user" });
    }
  }

  // get user by clerk id
  static async getUserByClerkId(c: Context) {
    try {
      const clerkId = c.get("clerkId");
      // get the user
      const user = await UserRepository.getUserByClerkId(clerkId);
      return c.json(
        {
          status: "success",
          data: user,
        },
        201,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new HTTPException(500, { message: "Failed to fetch user" });
    }
  }
}
