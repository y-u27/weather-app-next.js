/*
  Warnings:

  - Made the column `queryName` on table `City` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "City" ALTER COLUMN "queryName" SET NOT NULL;
