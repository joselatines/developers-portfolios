-- CreateTable
CREATE TABLE `portfolios` (
    `id` CHAR(36) NOT NULL,
    `thumbnail` TEXT NOT NULL,
    `created_by` CHAR(36) NOT NULL,
    `website_link` VARCHAR(255) NOT NULL,
    `github_link` VARCHAR(255) NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `type` VARCHAR(255) NOT NULL DEFAULT 'frontend',
    `updatedAt` DATETIME(0) NOT NULL,
    `file_name` TEXT NULL,
    `createdAt` DATETIME(0) NOT NULL,

    INDEX `created_by`(`created_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id` CHAR(36) NOT NULL,
    `comment` TEXT NULL,
    `rating` INTEGER NOT NULL DEFAULT 10,
    `portfolio_id` CHAR(36) NOT NULL,
    `rated_by` CHAR(36) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `portfolio_id`(`portfolio_id`),
    INDEX `rated_by`(`rated_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` CHAR(36) NOT NULL,
    `githubUsername` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NULL,
    `role` VARCHAR(255) NULL DEFAULT 'user',
    `profilePic` TEXT NULL,
    `provider` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `portfolios` ADD CONSTRAINT `Portfolios_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `Ratings_ibfk_5` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `Ratings_ibfk_6` FOREIGN KEY (`rated_by`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

