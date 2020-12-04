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

# all listings - mostly useless
CREATE TABLE reviewsDB.listings (
  listing_id int,
  name text,
);

CREATE TABLE reviewsDB.reviews (
  review_id int PRIMARY KEY,
  listing_id int,
  text text,
  date date,
  ratings frozen<ratings>,
);

# reviews by listing
CREATE TABLE reviewsDB.reviews_by_listing (
  listing_id int,
  review_id int,
  user_id int,
  username text,
  name text,
  email text,
  avatar_url text,
  text text,
  date date,
  ratings frozen<ratings>,
  PRIMARY KEY (listing_id, date) )
  WITH comment = 'used to find all reviews for a given listing, ordered by date';

# unneccessary for front end, but may implement
CREATE TABLE reviewsDB.users (
  user_id int,
  username text,
  name text,
  email text,
  avatar_url text,
  PRIMARY KEY (user_id)
);

# reviews by user
CREATE TABLE reviewsDB.reviews_by_user (
  user_id int,
  review_id int,
  listing_id int,
  username text,
  name text,
  email text,
  avatar_url text,
  text text,
  date date,
  ratings frozen<ratings>,
  PRIMARY KEY (user_id, date) )
  WITH comment = 'used to find all reviews for a given user, ordered by date';

  # we can ignore complexity by handling listing_id
  # and user_id randomly with our seeding script
  # assume we just have access to this on the front end