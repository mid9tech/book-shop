-- AlterTable
ALTER TABLE "Publisher" ADD COLUMN     "address" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ALTER COLUMN "description" DROP NOT NULL;
