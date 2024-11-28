import { z } from "zod";

export const UserSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string(),
  phone: z.string(),
  gender: z.string(),
  zipcode: z.string(),
  password: z.string(),
});
