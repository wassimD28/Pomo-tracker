import { Context } from "hono";
import { CategoryRepository } from "../repositories/categoryRepo";
import { HTTPException } from "hono/http-exception";
import { Entity } from "@/src/shared/types/enum/common.enum";
import { TaskRepository } from "../repositories/taskRep";

export const validateOwnership = (entityName: keyof typeof Entity) => {
  return async (c: Context, next: () => Promise<void>) => {
    try {
      const userId = c.get("userId");
      const EntityId = Number(c.req.param("id"));

      if (isNaN(EntityId)) {
        throw new HTTPException(400, {
          message: `Invalid ${entityName.toLocaleLowerCase()} ID`,
        });
      }
      let entity;
      switch (entityName) {
        case "CATEGORY":
          entity = await CategoryRepository.getCategoryById(EntityId);
          break;
        case "TASK":
          entity = await TaskRepository.getTaskById(EntityId);
          break;
        default:
          throw new HTTPException(400, {
            message: "Invalid entity name to validate ownership.",
          });
          break;
      }

      if (!entity) {
        throw new HTTPException(404, {
          message: `${entityName.toLocaleLowerCase()} not found to validate ownership.`,
        });
      }

      if (entity.userId !== userId) {
        throw new HTTPException(403, {
          message: "You do not have permission to access this category",
        });
      }

      await next();
    } catch (error) {
      if (error instanceof HTTPException) {
        throw error;
      }
      console.error("Error in ownership validation:", error);
      throw new HTTPException(500, {
        message: "Internal server error during ownership validation",
      });
    }
  };
};
