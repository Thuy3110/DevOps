-- mysql
CREATE DATABASE IF NOT EXISTS studentdb;

USE studentdb;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  age INT, 
  class VARCHER(255),
  email VARCHAR(255)
);