/* eslint-disable no-await-in-loop */
const fs = require('fs');
const faker = require('faker');

// 1,000,000
const writeListing = fs.createWriteStream('listings.csv');
// 100,000,000
const writeReviews = fs.createWriteStream('reviews.csv');
// 10,000,000
const writeUsers = fs.createWriteStream('users.csv');

async function bigSeed (records, encoding) {
  let numListings = records / 100;
  let numUsers = records / 10;
  let numReviews = records;

  // generate listings
  for (let i = 1; i < numListings; i += 1) {
    let id = i;
    let name = `${faker.hacker.adjective()} ${faker.address.city()} ${faker.hacker.noun()}`;
    try {
      await writeListing.write(`${id},${name},\n`, encoding);
      console.log('listing row generated');
    } catch (err) {
      console.log(err);
    }
  }
  writeUsers.end();
}
