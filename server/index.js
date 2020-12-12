/* eslint-disable no-console */
const express = require('express');
// const morgan = require('morgan');
const path = require('path');
const reviewsController = require('../db/controllers/review.js');
require('newrelic');

const port = 3003;

const app = express();

// app.use(morgan('dev'));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/../client/dist')));
app.use('/:id', express.static(path.join(__dirname, '/../client/dist')));

// ##### CRUD OPERATIONS #####

// create a review
app.post('/api/listings/:listing_id/reviews/:review_id', reviewsController.insertOneReview);

// get all reviews for a particular listing
app.get('/api/listings/:listing_id/reviews', reviewsController.getReviewsByListing);

// get a specfic review
app.get('/api/listings/:listing_id/reviews/:review_id', reviewsController.getOneReview);

// update a review
app.patch('/api/listings/:listing_id/reviews/:review_id', reviewsController.updateOneReview);

// delete a review
app.delete('/api/listings/:listing_id/reviews/:review_id', reviewsController.deleteOneReview);

app.listen(port, () => (
  console.log(`listening on port ${port}`)
));
