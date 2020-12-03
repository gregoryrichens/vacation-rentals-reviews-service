DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id GENERATED ALWAYS AS IDENTITY,
  user_id INT REFERENCES users(id) NOT NULL,
  listing_id INT REFERENCES listings(id) NOT NULL,
  text NOT NULL,
  cleanliness INT DEFAULT 5,
  communication INT DEFAULT 5,
  check_in INT DEFAULT 5,
  accuracy INT DEFAULT 5,
  location INT DEFAULT 5,
  value INT DEFAULT 5,
  date DATETIME NOT NULL,
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) DEFAULT NULL,
  photo_url VARCHAR(255) DEFAULT NULL,
);

DROP TABLE IF EXISTS listings;

CREATE TABLE listings (
  id GENERATED ALWAYS AS IDENTITY,
);