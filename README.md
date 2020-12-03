# Herkshire Bathaway Timeshare - Reviews Service

> Project description

## Related Projects

  - https://github.com/6-BTDF/reservations-service
  - https://github.com/6-BTDF/ImageCarousel-Service
  - https://github.com/6-BTDF/more-places-service

## Table of Contents

- [Usage](#Usage)
  - [Create](#Creating_Listings)
  - [Read](#Reading_Listings)
  - [Update](#Updating_Reviews)
  - [Delete](#Deleting_Reviews)

## Usage

> Some usage instructions

This reviews service utilizes a RESTful API architecture to retrieve and modify database-hosted, site-critical information. Syntax and routes conform to common sense REST standards.

### Creating_Listings

> POST: '/api/listings/'

Used to create a new listing.

INPUT: none, id determined and template rendered server-side

STATUS CODES:
- (201) on a successful request
- (400) on an unsuccessful request

RESPONSE FORMAT: the id of the created listing OR err message stringified
**JSON**
> {"id" : Number}

### Creating_Reviews

> POST: '/api/listings/:listing_id/review'

Used to create a review which is associated with an existing listing.

Given a listing id, and the content of a review in the POST body, this path will add a new review with the specified content, and ensure it is attached to a particular listing and user.

INPUT:
- listing_id, stored as a parameter in the url (see code snippet above)
- review stored as JSON in the request body in the format
>{
>  "user_id" : Number,
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

### Reading_Listings

> GET: '/api/listings/'

Used to retrieve all **listings**

INPUT: *n/a*

STATUS CODES:
- (200) on a successful request
- (404) on an unsuccessful request
- (408) on timeout

RESPONSE FORMAT: an array of listing objects
**JSON**
>[
>  {
>    "id" : Number,
>  },
>]

> GET: '/api/listings/:listing_id/'

Used to retrieve a single **listing** by its id number.

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
>  }
>]


### Reading_Reviews

> GET: '/api/reviews/:review_id/'

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

> PUT: '/api/reviews/:review_id/'

Used to update a **review** for a particular listing.

Given a specific review, this route will update said review with information as included in the request body.

INPUT:
- review_id, stored as a parameter in the url (see code snippet above)
- review info stored in the request body
**JSON**
>{
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

STATUS CODES:
- (201) on a successful request
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

### Deleting_Listing

> DELETE: '/api/listings/:listing_id/'

Used to delete a **listing**.

Given a specific listing, this will delete the listing in question.

INPUT: listing_id stored as a parameter in the url

STATUS CODES:
- (200) on a successful request
- (400) on an unsuccessful request

RESPONSE FORMAT: status code and stringified error if any

### Deleting_Review

> DELETE: '/api/reviews/:review_id/'

Used to delete a **review**.

Given a specific review, this will delete the review in question.

INPUT: review_id stored as a parameter in the url

STATUS CODES:
- (200) on a successful request
- (400) on an unsuccessful request

RESPONSE FORMAT: status code and stringified error if any
