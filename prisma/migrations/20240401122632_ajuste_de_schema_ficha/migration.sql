/*
  Warnings:

  - You are about to drop the column `data_atualizacao` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `data_criacao` on the `Ficha` table. All the data in the column will be lost.
  - You are about to drop the column `data_exclusao` on the `Ficha` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Ficha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ficha" DROP COLUMN "data_atualizacao",
DROP COLUMN "data_criacao",
DROP COLUMN "data_exclusao",
ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) NOT NULL;
