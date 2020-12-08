require('dotenv').config();
const debug = require('debug')('app:psql:seed');
const { Client } = require('pg');

async function seedDB(tableName, createTableQuery, importDataQuery) {
  const client = new Client({
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    port: process.env.PG_PORT,
  });

  try {
    await client.connect();
    debug(`Connected to ${process.env.PG_DB}`);
    await client.query(createTableQuery);
    debug(`${tableName} created`);
    await client.query(importDataQuery);
    debug(`data imported to ${tableName}`);
  } catch (err) {
    debug(err);
  }

  client.end();
  debug('done seeding');
}

module.exports = seedDB;
