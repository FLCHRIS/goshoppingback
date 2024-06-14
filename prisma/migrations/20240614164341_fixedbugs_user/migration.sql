-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_userId_fkey`;

-- AlterTable
ALTER TABLE `Image` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
