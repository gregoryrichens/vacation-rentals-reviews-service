CREATE KEYSPACE ReviewsDBtest WITH replication = {
  'class':'SimpleStrategy',
  'replication_factor':3
};

CREATE TYPE reviewsDB.ratings (
  accuracy tinyint,
  check_in tinyint,
  cleanliness tinyint,
  communication tinyint,
  location tinyint,
  value tinyint,
);

# reviews by listing
CREATE TABLE reviewsDB.reviews_by_listing (
  avatar_url text,
  date text,
  email text,
  listing_id int,
  name text,
  ratings frozen<ratings>,
  review_id int,
  text text,
  user_id int,
  username text,
  PRIMARY KEY (listing_id, review_id) )
  WITH comment = 'used to find all reviews for a given listing, ordered by date';

# unneccessary for front end, but may implement
CREATE TABLE reviewsDB.users (
  avatar_url text,
  email text,
  name text,
  user_id int,
  username text,
  PRIMARY KEY (user_id)
);

# reviews by user
CREATE TABLE reviewsDB.reviews_by_user (
  avatar_url text,
  date date,
  email text,
  listing_id int,
  name text,
  ratings frozen<ratings>,
  review_id int,
  text text,
  user_id int,
  username text,
  PRIMARY KEY (user_id, date) )
  WITH comment = 'used to find all reviews for a given user, ordered by date';

  # we can ignore complexity by handling listing_id
  # and user_id randomly with our seeding script
  # assume we just have access to this on the front end
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