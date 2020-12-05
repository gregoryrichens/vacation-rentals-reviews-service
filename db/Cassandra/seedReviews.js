/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
const fs = require('fs');
const faker = require('faker');
const path = require('path');

const writeReviews = fs.createWriteStream(path.join(__dirname, '/dataHolder/reviews.csv'));

const getRandom = function makeRandomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
};

// generate reviews/users by listing
async function generateReviews(numRecords, encoding) {
  if (numRecords < 100) {
    throw new Error('numRecords must be greater than or equal to 100');
  }

  const numReviews = numRecords;
  const numListings = numRecords / 100;
  const numUsers = numRecords / 10;

  for (let i = 1; i < numReviews; i += 1) {
    const listingID = getRandom(1, numListings);
    const id = i;
    const userID = getRandom(1, numUsers);
    const username = faker.internet.userName();
    const name = faker.name.firstName();
    const email = faker.name.email();
    const genNewPic = () => (`https://randomuser.me/api/portraits/${i % 2}/${i % 100}.jpg`);
    const avatarUrl = genNewPic();
    const text = faker.lorem.sentences();
    const date = `${faker.date.between('2015-01-01', '2020-12-31')}`;
    const cleanliness = getRandom(1, 5);
    const communication = getRandom(1, 5);
    const check_in = getRandom(1, 5);
    const accuracy = getRandom(1, 5);
    const location = getRandom(1, 5);
    const value = getRandom(1, 5);

    try {
      await writeReviews.write(`${listingID},${id},${userID},${username},${name},${email},${avatarUrl},${text},${date},${cleanliness},${communication},${check_in},${accuracy},${location},${value},\n`, encoding);
    } catch (err) {
      console.log(err);
    }
  }
  writeReviews.end();
}

generateReviews(100, 'utf-8');
