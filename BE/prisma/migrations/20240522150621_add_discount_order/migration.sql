/*
  Warnings:

  - Added the required column `discountPercentage` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "discountPercentage" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expired" SET DATA TYPE BIGINT;
