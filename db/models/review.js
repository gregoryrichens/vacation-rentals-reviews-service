const mongoose = require('mongoose');

// const cassandra = require('cassandra-driver');

// const authProvider = new cassandra.auth.PlainTextAuthProvider('', '');

// const client = new cassandra.Client({
//   contactPoints: ['127.0.0.1:9042'],
//   localDataCenter: 'datacenter1',
//   authProvider,
//   keyspace: 'reviewsdb',
// });

const reviewSchema = new mongoose.Schema({
  review: {
    id: Number,
    listing_id: Number,
    text: String,
    date: String,
  },
  user: {
    name: String,
    email: String,
    avatar_url: String,
  },
  ratings: {
    cleanliness: Number,
    communication: Number,
    check_in: Number,
    accuracy: Number,
    location: Number,
    value: Number,
  },
});

const ReviewModel = mongoose.model('Review', reviewSchema);

// function insert(review, callback) {
//   ReviewModel.create(review, callback);
// }

function findAll(callback) {
  ReviewModel.find({}, callback);
}

// module.exports = insert;
module.exports = findAll;
module.exports = ReviewModel;
