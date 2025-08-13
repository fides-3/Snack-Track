/*
  Warnings:

  - You are about to alter the column `lastTime` on the `waterintake` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `waterintake` MODIFY `lastTime` DATETIME(3) NULL;
