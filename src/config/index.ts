import { z } from "zod";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

/* ---------------- Phase 1: NODE_ENV ---------------- */
const nodeEnvSchema = z.enum(["development", "production", "test"]);
const NODE_ENV = nodeEnvSchema.parse(process.env.NODE_ENV);
const envFileMap = {
  development: ".env.development",
  production: ".env.production",
  test: ".env.test",
};

const envFilePath = path.resolve(process.cwd(), envFileMap[NODE_ENV]);
if (!fs.existsSync(envFilePath)) {
  console.error(
    `❌ Environment file not found: ${envFileMap[NODE_ENV]}\n` +
      `   Expected at: ${envFilePath}\n` +
      `   NODE_ENV=${NODE_ENV}`
  );
  process.exit(1);
}
dotenv.config({
  path: envFilePath,
});

/* ---------------- Phase 2: Full validation ---------------- */

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string().optional().default("3000"),
  Username: z.string().nonempty(),
  Password: z.string().nonempty(),
  Pseudocode: z.string().nonempty(),
});

function validateEnv() {
  try {
    const parsed = envSchema.parse({
      ...process.env,
    });
    console.log("✅ Environment variables validated");
    console.log(`📍 ${parsed.NODE_ENV} | Port ${parsed.PORT}`);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Invalid environment configuration:\n");
      error.issues.forEach((err) =>
        console.error(`  • ${err.path.join(".")}: ${err.message}`)
      );
      process.exit(1);
    }
    throw error;
  }
}
const config = Object.freeze(validateEnv());
export default config;
