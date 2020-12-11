// const mongoose = require('mongoose');
require('dotenv').config();
const cassandra = require('cassandra-driver');

const authProvider = new cassandra.auth.PlainTextAuthProvider(
  process.env.CASSANDRA_USER,
  process.env.CASSANDRA_PASS,
);

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  authProvider,
  keyspace: 'reviewsdb',
});

const insertOne = async (parameters) => {
  // avoid duplicate review ids??
  const query = 'INSERT INTO reviewsdb.reviews_by_listing (listing_id,review_id,accuracy,avatar_url,check_in,cleanliness,communication,date,email,location,name,text,user_id,username,value) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
  await client.execute(query, parameters);
};

const findAllByListing = async (parameters) => {
  const query = 'SELECT * FROM reviews_by_listing WHERE listing_id = ?;';
  const result = await client.execute(query, parameters, { prepare: true });
  return result;
};

const findOne = async (parameters) => {
  const query = 'SELECT * FROM reviewsdb.reviews_by_listing WHERE listing_id = ? AND review_id = ? ALLOW FILTERING;';
  const result = await client.execute(query, parameters, { prepare: true });
  return result;
};

const updateOne = async (parameters) => {
  const query = 'UPDATE reviewsdb.reviews_by_listing SET text = ? WHERE listing_id = ? AND date = ?;';
  await client.execute(query, parameters, { prepare: true });
};

const deleteOne = async (parameters) => {
  const query = 'DELETE FROM reviewsdb.reviews_by_listing WHERE review_id = ?';
  await client.execute(query, parameters, { prepare: true });
};

module.exports.insertOne = insertOne;
module.exports.findAllByListing = findAllByListing;
module.exports.findOne = findOne;
module.exports.updateOne = updateOne;
module.exports.deleteOne = deleteOne;

// const reviewSchema = new mongoose.Schema({
//   review: {
//     id: Number,
//     listing_id: Number,
//     text: String,
//     date: String,
//   },
//   user: {
//     name: String,
//     email: String,
//     avatar_url: String,
//   },
//   ratings: {
//     cleanliness: Number,
//     communication: Number,
//     check_in: Number,
//     accuracy: Number,
//     location: Number,
//     value: Number,
//   },
// });

// const ReviewModel = mongoose.model('Review', reviewSchema);

// // function insert(review, callback) {
// //   ReviewModel.create(review, callback);
// // }

// function findAll(callback) {
//   ReviewModel.find({}, callback);
// }

// // module.exports = insert;
// module.exports = findAll;
// module.exports = ReviewModel;
