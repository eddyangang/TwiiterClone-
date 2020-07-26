DROP DATABASE IF EXISTS `messageboardDB`;
CREATE DATABASE `messageboardDB`;
USE messageboardDB;

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    message VARCHAR(500),
	time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

