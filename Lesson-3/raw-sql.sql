USE todo;

CREATE TABLE user(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50),
  `email` VARCHAR(100),
  `password` VARCHAR(200)
);

CREATE TABLE todo(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(50),
  `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `user_id` INT,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

CREATE TABLE todo_item(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `text` VARCHAR(50),
  `done` BOOLEAN,
  `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `todo_id` INT,
  FOREIGN KEY (`todo_id`) REFERENCES `todo` (`id`) ON DELETE CASCADE
);
