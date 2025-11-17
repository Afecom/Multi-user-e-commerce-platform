/*
  Warnings:

  - You are about to drop the column `seller_id` on the `products` table. All the data in the column will be lost.
  - Added the required column `seller_profiles_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_seller_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "seller_id",
ADD COLUMN     "seller_profiles_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_seller_profiles_id_fkey" FOREIGN KEY ("seller_profiles_id") REFERENCES "seller_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
