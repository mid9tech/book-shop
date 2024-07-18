/*
  Warnings:

  - The values [ACTIVED,INACTIVED] on the enum `StatusProduct` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusProduct_new" AS ENUM ('ACTIVE', 'DELETED', 'INACTIVE');
ALTER TABLE "Product" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "status" TYPE "StatusProduct_new" USING ("status"::text::"StatusProduct_new");
ALTER TYPE "StatusProduct" RENAME TO "StatusProduct_old";
ALTER TYPE "StatusProduct_new" RENAME TO "StatusProduct";
DROP TYPE "StatusProduct_old";
ALTER TABLE "Product" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
