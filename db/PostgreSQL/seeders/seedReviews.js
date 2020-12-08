const seedDB = require('./connection.js');

const createTable = `
  DROP TABLE IF EXISTS reviews;
  CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    listing_id INT NOT NULL,
    accuracy SMALLINT DEFAULT 5,
    check_in SMALLINT DEFAULT 5,
    cleanliness SMALLINT DEFAULT 5,
    communication SMALLINT DEFAULT 5,
    date VARCHAR(30) NOT NULL,
    location SMALLINT DEFAULT 5,
    text VARCHAR(20000) NOT NULL,
    value SMALLINT DEFAULT 5
  );
`;

const importTableData = `
    COPY reviews (review_id, user_id, listing_id, accuracy, check_in, cleanliness, communication, date, location, text, value)
    FROM '/Users/gregoryrichens/Desktop/Hackreactor/work/capstones/systems-design/reviews-service/db/PostgreSQL/csvGenerators/dataHolder/reviews.csv'
    DELIMITER ','
    CSV HEADER;
`;

seedDB('reviews', createTable, importTableData);
