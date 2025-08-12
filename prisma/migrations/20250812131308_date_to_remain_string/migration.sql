/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `WaterIntake` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `waterintake` MODIFY `lastTime` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `WaterIntake_userId_key` ON `WaterIntake`(`userId`);
