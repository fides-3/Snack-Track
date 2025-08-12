-- DropForeignKey
ALTER TABLE `waterintake` DROP FOREIGN KEY `waterIntake_userId_fkey`;

-- AddForeignKey
ALTER TABLE `WaterIntake` ADD CONSTRAINT `WaterIntake_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
