/*
  Warnings:

  - You are about to drop the column `authorId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `username` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_authorId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "authorId";
ALTER TABLE "Review" ADD COLUMN     "username" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
