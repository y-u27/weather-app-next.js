/*
  Warnings:

  - Added the required column `cityId` to the `Weather` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Weather" ADD COLUMN     "cityId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- AddForeignKey
ALTER TABLE "Weather" ADD CONSTRAINT "Weather_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
