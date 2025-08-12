-- AlterTable
ALTER TABLE `diary` MODIFY `date` DATETIME(3) NULL,
    MODIFY `food` VARCHAR(191) NULL,
    MODIFY `calories` DOUBLE NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `waterIntake` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NULL,
    `lastTime` VARCHAR(191) NULL,
    `date` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `waterIntake` ADD CONSTRAINT `waterIntake_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
