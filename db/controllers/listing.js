const Listings = require('../models/listing.js');
const Review = require('../models/review.js');
// import Review

module.exports = {
  getListings: (req, res) => {
    Listings.findAll((err, docs) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.json(docs);
      }
    });
  },
  getOneListing: (req, res) => {
    const reqId = req.params.listing_id;
    Listings.findOne(reqId, (err, data) => {
      if (err) {
        console.log('error retriving single listing');
        res.end();
      } else {
        res.json(data);
      }
    });
  },
  insertOneReview: (req, res) => {
    const listing = req.params.listing_id;
    const review = new Review(req.body);
    console.log(review);
    Listings.findOne(listing, (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        results.reviews.push(review);
        results.save();
        console.log('review inserted');
        res.sendStatus(200);
      }
    });
  },
};
