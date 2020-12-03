/* eslint-disable no-console */
// const mongoose = require('mongoose');
const Reviews = require('../models/review.js');

module.exports = {
  getReviews: (req, res) => {
    Reviews.findAll((err, docs) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.json(docs);
      }
    });
  },
};
