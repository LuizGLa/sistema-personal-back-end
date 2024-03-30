/*
  Warnings:

  - Added the required column `senha` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "senha" TEXT NOT NULL;
