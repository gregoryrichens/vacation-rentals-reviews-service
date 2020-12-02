# Herkshire Bathaway Timeshare - Reviews Service

> Project description

## Related Projects

  - https://github.com/spicy-boiz/photo-carousel-service
  - https://github.com/spicy-boiz/reservations-service
  - https://github.com/spicy-boiz/places-to-stay-service
  - https://github.com/spicy-boiz/reviews-service

## Table of Contents

- [Usage](#Usage)
  - [Create](#Creating_Reviews)
  - [Read](#Reading_Listings)
  - [Update](#Updating_Reviews)
  - [Delete](#Deleting_Reviews)

## Usage

> Some usage instructions

### RESTful API instructions

This reviews service utilizes a RESTful API architecture to retrieve and modify database-hosted, site-critical information. Syntax and routes conform to common sense REST standards.

##### Creating_Reviews

> POST: '/api/review-listings/:id/reviews'
Used to append a review to an existing listing.

Given a listing id, and the content of a review in the POST body, this path will add a new review with the specified content, to a particular listing.

##### Reading_Listings

> GET: '/api/review-listings/reviews'
Used to retrieve all listings

*CAUTION* depending on database size, this can be a resource intensive request. As such, it should be used only when absolutely necessary. Try using below requests as alternatives first.

> GET: '/api/review-listings/:id/reviews'
Used to retrieve a single listing by its id number.

Given a listing id, this call will return a listing with an array of its associated reviews, and minor supplemental information.

##### Updating_Reviews

> PUT: '/api/review-listings/:listing_id/:review_id/reviews'
Used to update a review for a particular listing.

Given a specific review, this route will update said review with information as included in the request body.

##### Deleting_Reviews

> DELETE: '/api/review-listings/:listing_id/:review_id/reviews'
Used to delete a review for a particular listing.

Given a specific listing and review, this will delete the review in question.


