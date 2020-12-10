/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const reviewsController = require('../db/controllers/review.js');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const port = 3003;

const app = express();

mongoose.connect('mongodb://localhost/reviewsService', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan('dev'));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/../client/dist')));
app.use('/:id', express.static(path.join(__dirname, '/../client/dist')));

// ##### CRUD OPERATIONS #####

// create a review
app.post('/api/listings/:listing_id/reviews', reviewsController.insertOneReview);

// get all reviews for a particular listing
app.get('/api/listings/:listing_id/reviews', reviewsController.getReviewsByListing);

// get a specfic review
app.get('/api/reviews/:reivew_id', reviewsController.getOneReview);

// update a review
app.patch('/api/reviews/:review_id', reviewsController.updateOneReview);

// delete a review
app.delete('/api/reviews/:review_id', reviewsController.deleteOneReview);

app.listen(port, () => (
  console.log(`listening on port ${port}`)
));
