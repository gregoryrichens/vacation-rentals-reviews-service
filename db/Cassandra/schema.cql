CREATE KEYSPACE reviewsDB WITH replication = {
  'class':'SimpleStrategy',
  'replication_factor':1
};

USE reviewsDB;

CREATE TABLE reviewsDB.reviews_by_listing (
  accuracy tinyint,
  avatar_url text,
  check_in tinyint,
  cleanliness tinyint,
  communication tinyint,
  date text,
  email text,
  listing_id int,
  location tinyint,
  name text,
  ratings frozen<ratings>,
  review_id int,
  text text,
  user_id int,
  username text,
  value tinyint,
  PRIMARY KEY (listing_id, date) )
  WITH comment = 'used to find all reviews for a given listing, ordered by date';

CREATE TABLE reviewsDB.users (
  avatar_url text,
  email text,
  name text,
  user_id int,
  username text,
  PRIMARY KEY (user_id)
);

CREATE TABLE reviewsDB.reviews_by_user (
  accuracy tinyint,
  avatar_url text,
  check_in tinyint,
  cleanliness tinyint,
  communication tinyint,
  date date,
  email text,
  listing_id int,
  location tinyint,
  name text,
  ratings frozen<ratings>,
  review_id int,
  text text,
  user_id int,
  username text,
  value tinyint,
  PRIMARY KEY (user_id, date) )
  WITH comment = 'used to find all reviews for a given user, ordered by date';

  -- CREATE TABLE reviewsDB.reviews (
  --   review_id int PRIMARY KEY,
  --   listing_id int,
  --   text text,
  --   date date,
  --   ratings frozen<ratings>,
  -- );

  -- # all listings - mostly useless
  -- CREATE TABLE reviewsDB.listings (
  --   listing_id int,
  --   name text,
  -- );