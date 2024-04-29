/*
  Warnings:

  - You are about to drop the column `authorId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `authorUser` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_authorId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "authorId";
ALTER TABLE "Review" ADD COLUMN     "authorUser" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorUser_fkey" FOREIGN KEY ("authorUser") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
