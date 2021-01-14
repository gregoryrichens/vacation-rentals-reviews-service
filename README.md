# Herkshire Bathaway Timeshare - Reviews Service

## Description

Herkshire Bathaway is an integrated web application that allows users to browse a variety of timeshare and vacation rental listings, accomplishing the following tasks:
* understand property look and feel via high definition listing photographs
* check availability and book a reservation
* deep dive on the ins and outs of listing by perusing trusted reviews of past guests
* investigate related properties

The reviews service for which this README is written utilizes a CERN stack - Cassandra DB, Express, React, and Node - and is best deployed within an EC2 ecosystem. However, the framework is flexible enough to accomodated different database choices (e.g. Postgres) with minimal configuration changes.

### Site Preview

##### reviews component
![](client/dist/SDC.gif)

##### whole site
![](https://mysdcgarbage.s3-us-west-1.amazonaws.com/vacation+rental+main.png)
1[](https://mysdcgarbage.s3-us-west-1.amazonaws.com/vacation+rental+reservation.png)

## Related Projects

  - https://github.com/6-BTDF/reservations-service
  - https://github.com/6-BTDF/ImageCarousel-Service
  - https://github.com/6-BTDF/more-places-service

## Table of Contents

- [Available Scripts](#Available_Scripts)
- [API Routes](#API_routes)
  - [Create](#Creating_Listings)
  - [Read](#Reading_Listings)
  - [Update](#Updating_Reviews)
  - [Delete](#Deleting_Reviews)

## Available_Scripts

### `npm start`

Runs the app in the development mode via node server on local machine.\
Open [http://localhost:3000](http://localhost:3003) to view it in the browser.

Port 3003 is also the listening port for API requests.

The page will not reload if you make edits.\

### `npm run react-dev`

Builds the app for production to the `client/dist` folder.\
It correctly bundles React in production mode (configurable within webpack.config.js) and optimizes the build for the best performance.

### `npm run generate-table_name-database_name`

There are several scripts available by default. These scripts will generate csv files of configurable length for the specified table and the specified database. Postgres and Cassandra are available by default. Connections within the server are setup for Cassandra, so minor configuration is required. Csv files are stored in db/db_name/csvGenerators/dataHolder

### other

As listed in package.json

## API_routes

This reviews service utilizes a RESTful API architecture to retrieve and modify database-hosted, site-critical information. Syntax and routes conform to common sense REST standards.

### Creating_Reviews

> POST: '/api/listings/:listing_id/reviews'

Used to create a review which is associated with an existing listing.

Given a listing id, and the content of a review in the POST body, this path will add a new review with the specified content, and ensure it is attached to a particular listing and user.

INPUT:
- listing_id, stored as a parameter in the url (see code snippet above)
- review stored as JSON in the request body in the format
>{
>  "listing_id" : Number,
>  "user_id" : Number,
>  "username" : String,
>  "name" : String,
>  "email" : String,
>  "avatar_url" : String,
>  "text" : String,
>  "date" : String,
>  "cleanliness" : Number,
>  "communication" : Number,
>  "check_in" : Number,
>  "accuracy" : Number,
>  "location" : Number,
>  "value" : Number,
>}

STATUS CODES:
- (201) on a successful request
- (404) on an unsuccessful request

RESPONSE FORMAT: the id of the created listing OR err message stringified
**JSON**
> {"id" : Number}

### Reading_Reviews_By_Listing

> GET: '/api/listings/:listing_id/'

Used to retrieve all **reviews** by a single listing id.

Given a listing id, this call will return a listing with an array of its associated reviews, and minor supplemental information.

INPUT: listing_id, stored as a parameter in the url (see code snippet above)

STATUS CODES:
- (200) on a successful request
- (404) on an unsuccessful request

RESPONSE FORMAT: a single JSON object in the format
**JSON**
>[
>  {
>    "id" : Number,
>    "listing_id" : Number,
>    "user_id" : Number,
>    "text" : String,
>    "date" : String,
>    "cleanliness :" Number,
>    "communication" : Number,
>    "check_in" : Number,
>    "accuracy" : Number,
>    "location" : Number,
>    "value" : Number,
>  },
>  ...
>]


### Reading_Reviews_By_ID

> GET: '/api/listings/:listing_id/reviews/:review_id/'

Used to retrieve a single **review** by its id number.

Given a review id, this call will return a review with its associated data.

INPUT: review_id, stored as a parameter in the url (see code snippet above)

STATUS CODES:
- (200) on a successful request
- (404) on an unsuccessful request

RESPONSE FORMAT: a single JSON object in the format
**JSON**
>{
>  "id" : Number,
>  "listing_id" : Number,
>  "user_id" : Number,
>  "text" : String,
>  "date" : String,
>  "cleanliness :" Number,
>  "communication" : Number,
>  "check_in" : Number,
>  "accuracy" : Number,
>  "location" : Number,
>  "value" : Number,
>}

### Updating_Reviews

> PUT: '/api/listings/:listing_id/reviews/:review_id/'

Used to update a **review** for a particular listing.

Given a specific listing and review, this route will update said review with information as included in the request body.

INPUT:
- listing_id & review_id, stored as a parameter in the url (see code snippet above)
- review info stored in the request body
**JSON**
>{
>  "user_id" : Number,
>  "username" : String,
>  "name" : String,
>  "email" : String,
>  "avatar_url" : String,
>  "text" : String,
>  "date" : String,
>  "cleanliness" : Number,
>  "communication" : Number,
>  "check_in" : Number,
>  "accuracy" : Number,
>  "location" : Number,
>  "value" : Number,
>}

STATUS CODES:
- (201) on a successful request
- (404) on an unsuccessful request

RESPONSE FORMAT: a single JSON object in the format
**JSON**
>{
>  "reivew_id": String,
>  "user_id" : Number,
>  "username" : String,
>  "name" : String,
>  "email" : String,
>  "avatar_url" : String,
>  "text" : String,
>  "date" : String,
>  "cleanliness" : Number,
>  "communication" : Number,
>  "check_in" : Number,
>  "accuracy" : Number,
>  "location" : Number,
>  "value" : Number,
>}

### Deleting_Review

> DELETE: '/api/listings/:listing_id/reviews/:review_id/'

Used to delete a **review**.

Given a specific review, this will delete the review in question.

INPUT: review_id stored as a parameter in the url

STATUS CODES:
- (200) on a successful request
- (400) on an unsuccessful request

RESPONSE FORMAT: status code and stringified error if any
