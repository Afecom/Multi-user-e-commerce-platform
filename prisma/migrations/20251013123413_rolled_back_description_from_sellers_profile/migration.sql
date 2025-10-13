/*
  Warnings:

  - Made the column `description` on table `seller_profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "seller_profiles" ALTER COLUMN "description" SET NOT NULL;
