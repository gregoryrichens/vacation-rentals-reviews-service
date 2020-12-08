const seedDB = require('./connection.js');

const createTable = `
  DROP TABLE IF EXISTS listings;
  CREATE TABLE listings (
    listing_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  );
`;

const importTableData = `
    COPY listings (listing_id, name)
    FROM '/Users/gregoryrichens/Desktop/Hackreactor/work/capstones/systems-design/reviews-service/db/PostgreSQL/csvGenerators/dataHolder/listings.csv'
    DELIMITER ','
    CSV HEADER;
`;

seedDB('listings', createTable, importTableData);
