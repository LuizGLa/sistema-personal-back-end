/*
  Warnings:

  - Added the required column `updatedAt` to the `Exercicio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercicio" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) NOT NULL;
