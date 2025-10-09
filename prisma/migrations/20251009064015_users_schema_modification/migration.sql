-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('customer', 'admin', 'seller');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "user_role" DEFAULT 'customer';
