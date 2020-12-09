const seedDB = require('./connection.js');

const createTable = `
  DROP TABLE IF EXISTS users;
  CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    avatar_url VARCHAR(255) DEFAULT NULL
  );
`;

const importTableData = `
    COPY users (user_id, username, name, email, avatar_url)
    FROM '/Users/gregoryrichens/Desktop/Hackreactor/work/capstones/systems-design/reviews-service/db/PostgreSQL/csvGenerators/dataHolder/users.csv'
    DELIMITER ','
    CSV HEADER;
`;

seedDB('users', createTable, importTableData);
