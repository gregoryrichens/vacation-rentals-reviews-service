/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const listingController = require('../db/controllers/listing.js');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const port = 3003;

const app = express();

mongoose.connect('mongodb://localhost/reviewsService', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan('dev'));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/../client/dist')));
app.use('/:id', express.static(path.join(__dirname, '/../client/dist')));

// get all listings
app.get('/api/listings/reviews', listingController.getListings);

// get a specific listing
app.get('/api/listings/:listing_id/reviews', listingController.getOneListing);

// create a review
app.post('/api/listings/:listing_id/reviews', listingController.insertOneReview);

// update a review
app.patch('/api/listings/:listing_id/:review_id/reviews', listingController.updateOneReview);

// delete a review
app.delete('/api/listings/:listing_id/reviews', listingController.deleteOneListing);

app.listen(port, () => (
  console.log(`listening on port ${port}`)
));
