/*
  Warnings:

  - Made the column `total_amount` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "total_amount" SET NOT NULL;
