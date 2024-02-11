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

-- create routines table

CREATE TABLE `routines` (
  `id` varchar(40) NOT NULL DEFAULT (uuid()),
  `title` varchar(20) NOT NULL,
  `description` varchar(235) DEFAULT '',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` datetime NOT NULL,
  `modified_at` datetime NOT NULL DEFAULT (now()),
  `created_by` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
);



-- create todos table
CREATE TABLE `todos` (
  `id` varchar(40) NOT NULL DEFAULT (uuid()),
  `title` varchar(32) NOT NULL,
  `description` varchar(64) DEFAULT '',
  `created_at` datetime NOT NULL,
  `modified_at` datetime NOT NULL DEFAULT (now()),
  `routine_id` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_routine_id` (`routine_id`),
  CONSTRAINT `fk_routine_id` FOREIGN KEY (`routine_id`) REFERENCES `routines` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
);
