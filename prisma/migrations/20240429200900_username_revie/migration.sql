/*
  Warnings:

  - You are about to drop the column `authorUser` on the `Review` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_authorUser_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "authorUser";
ALTER TABLE "Review" ADD COLUMN     "authorId" INT4 NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
