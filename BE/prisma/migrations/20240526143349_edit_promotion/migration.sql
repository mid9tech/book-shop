/*
  Warnings:

  - You are about to drop the column `discountPercentage` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `isPayed` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `ProductPromotion` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Promotion` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PromotionLevel" AS ENUM ('ORDER', 'ITEM');

-- CreateEnum
CREATE TYPE "PromotionType" AS ENUM ('PERCENT', 'VALUE');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "discountPercentage",
DROP COLUMN "isPayed",
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "promotionId" TEXT,
ADD COLUMN     "reducePrice" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ProductPromotion" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "totalPrice",
ADD COLUMN     "discountValue" DOUBLE PRECISION,
ADD COLUMN     "level" "PromotionLevel" NOT NULL DEFAULT 'ORDER',
ADD COLUMN     "minValue" DOUBLE PRECISION,
ADD COLUMN     "type" "PromotionType" NOT NULL DEFAULT 'VALUE',
ALTER COLUMN "discountPercentage" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
