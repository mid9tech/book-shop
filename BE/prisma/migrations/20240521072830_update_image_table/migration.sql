/*
  Warnings:

  - You are about to drop the column `adminId` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_ownerId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "adminId",
ALTER COLUMN "ownerId" DROP NOT NULL;
