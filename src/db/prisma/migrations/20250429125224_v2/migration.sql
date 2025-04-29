/*
  Warnings:

  - You are about to alter the column `codexCoinBalance` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "codexCoinBalance" SET DEFAULT 0,
ALTER COLUMN "codexCoinBalance" SET DATA TYPE INTEGER;
