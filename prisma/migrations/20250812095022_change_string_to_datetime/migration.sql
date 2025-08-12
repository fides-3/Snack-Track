/*
  Warnings:

  - Made the column `lastTime` on table `waterintake` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `waterintake` MODIFY `lastTime` DATETIME(3) NOT NULL;
