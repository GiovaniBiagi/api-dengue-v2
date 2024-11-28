import { ZodIssue } from "zod";

export type Error = { message: string; errors?: Record<ZodIssue[]> };
