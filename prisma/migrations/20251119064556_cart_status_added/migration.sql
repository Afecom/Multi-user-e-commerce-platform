-- CreateEnum
CREATE TYPE "cart_status" AS ENUM ('active', 'checked_out', 'cancelled');

-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "status" "cart_status" NOT NULL DEFAULT 'active';
