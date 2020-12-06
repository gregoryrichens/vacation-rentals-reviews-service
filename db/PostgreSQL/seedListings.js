/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
const fs = require('fs');
const faker = require('faker');
const path = require('path');

const writeListings = fs.createWriteStream(path.join(__dirname, '/dataHolder/listings.csv'));
writeListings.write('listing_id,name\n');

function generateListings(numRecords) {
  let listingID = 1;

  function recursiveWrite() {
    if (listingID === numRecords + 1) return writeListings.end();
    const id = listingID;
    const name = `${faker.commerce.productAdjective()} ${faker.address.city()} ${faker.company.catchPhraseNoun()}`;
    const andyAreYouOk = writeListings.write(`${id},${name}\n`);
    listingID += 1;
    if (!andyAreYouOk) writeListings.once('drain', recursiveWrite);
    else recursiveWrite();
  }

  recursiveWrite(numRecords);
}

module.exports.generateListings = generateListings;
