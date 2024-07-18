/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Publisher" DROP CONSTRAINT "Publisher_createdBy_fkey";

-- DropTable
DROP TABLE "Admin";

-- CreateTable
CREATE TABLE "HShopAdmin" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "gender" "Gender" NOT NULL DEFAULT 'UNDEFINED',
    "phoneNumber" TEXT,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "avatar" TEXT DEFAULT 'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HShopAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HShopAdmin_email_key" ON "HShopAdmin"("email");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "HShopAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "HShopAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publisher" ADD CONSTRAINT "Publisher_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "HShopAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "HShopAdmin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
