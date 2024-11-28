/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Changed the type of `authorId` on the `News` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_authorId_fkey";

-- AlterTable
ALTER TABLE "News" DROP COLUMN "authorId",
ADD COLUMN     "authorId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "_id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("_id");

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
