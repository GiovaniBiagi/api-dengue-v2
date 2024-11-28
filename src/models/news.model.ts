import { z } from "zod";

// model
// id        String   @id @default(cuid())
//   title     String
//   subtitle  String
//   content   String
//   author    User     @relation(fields: [authorId], references: [id])
//   authorId  String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

export const NewsSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  content: z.string(),
  authorId: z.string(),
});

export type News = z.infer<typeof NewsSchema>;
