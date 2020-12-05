/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
const fs = require('fs');
const faker = require('faker');
const path = require('path');

const writeReviews = fs.createWriteStream(path.join(__dirname, '/dataHolder/reviews.csv'));
writeReviews.write('listing_id,review_id,user_id,username,name,email,avatar_url,text,date,cleanliness,communication,check_in,accuracy,location,value\n');

const getRandom = function makeRandomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
};

// generate reviews/users by listing
function generateReviews(numRecords) {
  let reviewID = 1;
  const numListings = numRecords / 100;
  const numUsers = numRecords / 10;

  function recursiveWrite() {
    if (reviewID === numRecords + 1) return writeReviews.end();
    const listingID = getRandom(1, numListings);
    const id = reviewID;
    const userID = getRandom(1, numUsers);
    const username = faker.internet.userName();
    const name = faker.name.firstName();
    const email = faker.internet.email();
    const genNewPic = () => (`https://randomuser.me/api/portraits/${reviewID % 2}/${reviewID % 100}.jpg`);
    const avatarUrl = genNewPic();
    const text = faker.lorem.sentences();
    const date = `${faker.date.between('2015-01-01', '2020-12-31')}`;
    const cleanliness = getRandom(1, 5);
    const communication = getRandom(1, 5);
    const check_in = getRandom(1, 5);
    const accuracy = getRandom(1, 5);
    const location = getRandom(1, 5);
    const value = getRandom(1, 5);
    const areYouOkayAndy = writeReviews.write(`${listingID},${id},${userID},${username},${name},${email},${avatarUrl},${text},${date},${cleanliness},${communication},${check_in},${accuracy},${location},${value}\n`);
    reviewID += 1;
    if (!areYouOkayAndy) writeReviews.once('drain', recursiveWrite);
    else recursiveWrite();
  }
  recursiveWrite();
}

generateReviews(100000000);