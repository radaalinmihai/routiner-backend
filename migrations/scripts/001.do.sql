-- create users table
CREATE TABLE `users` (
 `id` int NOT NULL AUTO_INCREMENT,
 `userId` varchar(40) DEFAULT (uuid()),
 `username` varchar(255) NOT NULL,
 `password` varchar(255) NOT NULL,
 `email` varchar(255) NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `uniqueEmail` (`email`)
);

-- create todos table
CREATE TABLE `todos` (
  `id` varchar(40) NOT NULL DEFAULT (uuid()),
  `title` varchar(32) NOT NULL,
  `description` varchar(64) DEFAULT '',
  `created_at` datetime NOT NULL,
  `modified_at` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
);

-- create routines table

CREATE TABLE `routines` (
	`id` varchar(40) NOT NULL DEFAULT (UUID()),
	`title` varchar(20) NOT NULL,
	`description` VARCHAR(235) DEFAULT '',

	`start_date` DATETIME NOT NULL,
	`end_date` DATETIME NOT NULL,

	`created_at` DATETIME NOT NULL,
	`modified_at` DATETIME NOT NULL DEFAULT (NOW()),

	PRIMARY KEY (`id`),
	UNIQUE KEY `id` (`id`)
);

-- create relation table
CREATE TABLE `routines_todos` (
	`id` VARCHAR(40) NOT NULL DEFAULT (UUID()),
	`routine_id` VARCHAR(40) NOT NULL,
	`todo_id` VARCHAR(40) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `id` (`id`)
);
