/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `refreshToken`;

-- CreateTable
CREATE TABLE `Refreshtokens` (
    `refreshToken` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `Refreshtokens_refreshToken_key`(`refreshToken`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
