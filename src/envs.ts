// env.ts
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  API_VERSION: z.string().default("v1"),
  DATABASE_URL: z.string().url(),
  DENGUE_API_URL: z.string().url(),
  JWT_SECRET: z.string(),
  GMAIL_APP_PASSWORD: z.string(),
  GMAIL_APP_USER: z.string().email(),
  ENV: z
    .union([
      z.literal("development"),
      z.literal("testing"),
      z.literal("production"),
    ])
    .default("development"),
});

export const envs = envSchema.parse(process.env);
