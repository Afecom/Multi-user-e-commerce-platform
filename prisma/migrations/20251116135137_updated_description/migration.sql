/*
  Warnings:

  - You are about to drop the column `descritpion` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "descritpion",
ADD COLUMN     "description" TEXT;
