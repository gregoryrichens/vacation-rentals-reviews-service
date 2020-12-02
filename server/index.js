const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const listingController = require('../db/controllers/listing.js');

mongoose.set('useCreateIndex', true);
const port = 3003;

const app = express();

mongoose.connect('mongodb://localhost/reviewsService', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan('dev'));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/../client/dist')));
app.use('/:id', express.static(path.join(__dirname, '/../client/dist')));

// get all listings
app.get('/api/review-listings/reviews', listingController.getListings);

// get a specific listing
app.get('/api/review-listings/:id/reviews', listingController.getOneListing);

app.listen(port, () => (
  console.log(`listening on port ${port}`)
));
