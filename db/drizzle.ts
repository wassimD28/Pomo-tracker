// db/drizzle.ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

config({ path: ".env" });

// Create the Neon connection
const sql = neon(process.env.NEON_DATABASE_URL!);
// Create the database instance
export const db = drizzle(sql);
