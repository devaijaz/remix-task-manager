-- CreateTable
CREATE TABLE `Query_Logging` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `query` TEXT NOT NULL,
    `params` VARCHAR(500) NOT NULL,
    `time_in_ms` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
