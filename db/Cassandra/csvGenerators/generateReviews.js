/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
const fs = require('fs');
const faker = require('faker');
const path = require('path');

const writeReviews = fs.createWriteStream(path.join(__dirname, '/dataHolder/reviews.csv'));
writeReviews.write('listing_id,date,accuracy,avatar_url,check_in,cleanliness,communication,email,location,name,review_id,text,user_id,username,value\n');

const years = [2015, 2016, 2017, 2018, 2019, 2020];
const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];

const getRandom = function makeRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
    const genNewPic = () => (`https://randomuser.me/api/portraits/${(reviewID % 2 === 1) ? 'men' : 'women'}/${reviewID % 100}.jpg`);
    const avatarUrl = genNewPic();
    const date = `${years[reviewID % 6]}-${months[reviewID % 12]}-${days[reviewID % 28]}`;
    const text = faker.lorem.sentences();
    const cleanliness = getRandom(1, 5);
    const communication = getRandom(1, 5);
    const check_in = getRandom(1, 5);
    const accuracy = getRandom(1, 5);
    const location = getRandom(1, 5);
    const value = getRandom(1, 5);
    const areYouOkayAndy = writeReviews.write(`${listingID},${date},${accuracy},${avatarUrl},${check_in},${cleanliness},${communication},${email},${location},${name},${id},${text},${userID},${username},${value}\n`);
    reviewID += 1;
    if (!areYouOkayAndy) writeReviews.once('drain', recursiveWrite);
    else recursiveWrite();
  }
  recursiveWrite();
}

generateReviews(100000000);

module.exports.generateReviews = generateReviews;
