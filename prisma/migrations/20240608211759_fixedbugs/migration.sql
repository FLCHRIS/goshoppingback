/*
  Warnings:

  - Made the column `imageId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_imageId_fkey`;

-- AlterTable
ALTER TABLE `Image` MODIFY `url` VARCHAR(191) NULL,
    MODIFY `publicId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `imageId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `Image`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
