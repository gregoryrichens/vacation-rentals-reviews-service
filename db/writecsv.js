/* eslint-disable no-await-in-loop */
const fs = require('fs');
const faker = require('faker');

// 1,000,000
const writeListings = fs.createWriteStream('listings.csv');
// 100,000,000
const writeReviews = fs.createWriteStream('reviews.csv');
// 10,000,000
const writeUsers = fs.createWriteStream('users.csv');

// helper function to generate ratings

async function bigSeed(records, encoding) {
  const numListings = records / 100;
  const numUsers = records / 10;
  const numReviews = records;

  // generate listings
  for (let i = 1; i < numListings; i += 1) {
    const id = i;
    const name = `${faker.hacker.adjective()} ${faker.address.city()} ${faker.hacker.noun()}`;
    try {
      await writeListings.write(`${id},${name},\n`, encoding);
      console.log('listing row generated');
    } catch (err) {
      console.log(err);
    }
  }
  writeListings.end();

  // generate users
  for (let i = 1; i < numUsers; i += 1) {
    const id = i;
    const username = faker.internet.userName();
    const name = faker.name.firstName();
    const email = faker.name.email();
    const genNewPic = () => (`https://randomuser.me/api/portraits/${i % 2}/${i % 100}.jpg`);
    const avatarUrl = genNewPic();
    try {
      await writeUsers.write(`${id},${username},${name},${email},${avatarUrl},\n`, encoding);
      console.log('listing row generated');
    } catch (err) {
      console.log(err);
    }
  }

  // generate reviews by listing
  for (let i = 1; i < numReviews; i += 1) {
    const listingID = Math.ceil(Math.random() * numListings);
    const id = i;
    const userID = Math.ceil(Math.random() * numUsers);
    const username = faker.internet.userName();
    const name = faker.name.firstName();
    const email = faker.name.email();
    const genNewPic = () => (`https://randomuser.me/api/portraits/${i % 2}/${i % 100}.jpg`);
    const avatarUrl = genNewPic();
    const text = faker.lorem.sentences();
    const date = `${faker.date.month()} ${faker.date.between('2015-01-01', '2020-12-31').slice(0, 5)}`;

    try {
      await writeUsers.write(`${id},${username},${name},${email},${avatarUrl},\n`, encoding);
      console.log('listing row generated');
    } catch (err) {
      console.log(err);
    }
  }
}

bigSeed();
