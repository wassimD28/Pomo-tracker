import { db } from "@/db/drizzle";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export interface CreateUserParams {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}

export class UserRepository {
  // Create a new user
  static async createUser(params: CreateUserParams) {
    try {
      const [newUser] = await db
        .insert(users)
        .values({
          clerkId: params.clerkId,
          firstName: params.firstName,
          lastName: params.lastName,
          email: params.email,
          photo: params.photo,
        })
        .returning();

      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  // Get user by Clerk ID
  static async getUserByClerkId(clerkId: string) {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
      });

      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  // get user by userId
  static async getUserById(userId: number) {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.id, Number(userId)),
      });
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  // Update user
  static async updateUser(clerkId: string, data: Partial<CreateUserParams>) {
    try {
      const [updatedUser] = await db
        .update(users)
        .set(data)
        .where(eq(users.clerkId, clerkId))
        .returning();

      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  // Delete user
  static async deleteUser(clerkId: string) {
    try {
      const [deletedUser] = await db
        .delete(users)
        .where(eq(users.clerkId, clerkId))
        .returning();

      return deletedUser;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}
