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
