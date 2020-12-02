/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const faker = require('faker');
const mongoose = require('mongoose');
const data = require('./reviewData');
const Review = require('./db/models/review');
const Listing = require('./db/models/listing');

mongoose.connect('mongodb://localhost/reviewsService',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
mongoose.set('useCreateIndex', true);

const seedDb = (d) => {
  d.forEach((listing) => {
    const reviewIdCount = 0;
    const currentListing = new Listing.ListingModel(listing);
    const randomRating = () => (
      ((Math.random() * 5) + 2).toString().slice(0, 1)
    );

    const years = [2015, 2016, 2017, 2018, 2019, 2020];
    const randomYear = (array) => (
      array[Math.floor(Math.random() * 6)]
    );

    const newReview = () => ({
      review: {
        id: reviewIdCount,
        listing_id: currentListing.id,
        text: faker.lorem.sentences(),
        date: `${faker.date.month()} ${randomYear(years)}`,
      },
      user: {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        avatar_url: '',
      },
      ratings: {
        cleanliness: Number(randomRating()),
        communication: Number(randomRating()),
        check_in: Number(randomRating()),
        accuracy: Number(randomRating()),
        location: Number(randomRating()),
        value: Number(randomRating()),
      },
    });

    const reviewArray = [];
    let num = 1;
    const randomAmount = Math.floor(Math.random() * (200 - 30)) + 30;

    while (num <= randomAmount) {
      const randPicNum = Math.floor(Math.random() * 100);
      const gend = ['men', 'women'];
      const randGend = gend[Math.floor(Math.random() * 2)];
      const genNewPic = () => (`https://randomuser.me/api/portraits/${randGend}/${randPicNum}.jpg`);
      const currentReview = new Review(newReview());
      currentReview.review.id = num;
      currentReview.user.avatar_url = genNewPic();
      reviewArray.push(currentReview);
      currentReview.save((err) => {
        if (err) {
          console.error(err);
        } else {
          // console.log('review saved');
        }
      });
      num++;
    }

    currentListing.reviews = reviewArray;

    currentListing.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('saved listing');
      }
    });
  });
};

seedDb(data);
