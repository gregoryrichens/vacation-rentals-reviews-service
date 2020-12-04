const fs = require('fs');
const faker = require('faker');

const writeListing = fs.createWriteStream('listings.csv');
const writeReviews = fs.createWriteStream('reviews.csv');

async function bigSeed (records, encoding)