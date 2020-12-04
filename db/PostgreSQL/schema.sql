DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  listing_id INT REFERENCES listings(id) NOT NULL,
  text VARCHAR(20000) NOT NULL,
  cleanliness SMALLINT DEFAULT 5,
  communication SMALLINT DEFAULT 5,
  check_in SMALLINT DEFAULT 5,
  accuracy SMALLINT DEFAULT 5,
  location SMALLINT DEFAULT 5,
  value SMALLINT DEFAULT 5,
  date DATETIME NOT NULL,
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  avatar_url VARCHAR(255) DEFAULT NULL,
);

DROP TABLE IF EXISTS listings;

CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
);