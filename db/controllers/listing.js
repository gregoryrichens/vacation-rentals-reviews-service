const { ListingModel, findOne, findAll } = require('../models/listing.js');
const Review = require('../models/review.js');
// import Review

module.exports = {
  getListings: (req, res) => {
    findAll((err, docs) => {
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
    findOne(reqId, (err, data) => {
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
    findOne(listing, (err, results) => {
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
  updateOneReview: async (req, res) => {
    const listing = req.params.listing_id;
    const reviewID = req.params.review_id;
    const { text } = req.body;
    let newListing;
    try {
      newListing = await ListingModel.findOne({ id: listing });
    } catch (err) {
      console.log(err);
      return res.sendStatus(404);
    }

    let updated = false;
    for (let i = 0; i < newListing.reviews.length; i += 1) {
      if (newListing.reviews[i].review.id === Number(reviewID)) {
        newListing.reviews[i].review.text = text;
        updated = true;
        break;
      }
    }

    if (updated) {
      try {
        await ListingModel.findOneAndUpdate(
          { id: listing },
          newListing,
          { new: true },
        );
        res.status(200).send('inserted and updated');
      } catch (err) {
        console.log(err);
        return res.sendStatus(400);
      }
    } else {
      res.status(404).send('no review by that id');
    }
  },
};
