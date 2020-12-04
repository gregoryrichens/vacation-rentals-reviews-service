CREATE KEYSPACE ReviewsDB WITH replication = {
  'class':'SimpleStrategy',
  'replication_factor':3
};

CREATE TYPE reviewsDB.ratings (
  cleanliness tinyint,
  communication tinyint,
  check_in tinyint,
  accuracy tinyint,
  location tinyint,
  value tinyint,
);

CREATE TYPE reviewsDB.users (
  name text,
  email text,
  avatar_url text,
);

CREATE TABLE reviewsDB.listings (
  listing_id UUID,
);

CREATE TABLE reviewsDB.reviews_by_listing (
  listing_id UUID,
  review_id UUID,
  user frozen<users>,
  text text,
  date date,
  ratings frozen<ratings>,
  PRIMARY KEY (listing_id, date) )
  WITH comment = 'used to find all reviews for a given listing, ordered by date';

