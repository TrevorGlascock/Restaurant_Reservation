# [Restaurant Reservation Fullstack Web App](https://restaurant-reserve-127-client.herokuapp.com/)

<hr/>

## Live Deployment Links
* ### [React App Client-Side Deployment](https://restaurant-reserve-127-client.herokuapp.com/)

* ### [Express API Back-End Deployment](https://restaurant-reserve-127-backend.herokuapp.com/)
<hr/>


## General Usage and Screenshots
> Info blurb goes here
> 
<hr/>

## API Documentation
> This REST API adheres to RESTful standards. There are only two resource endpoints: `reservations` and `tables`. This API supports the following requests:

### `GET /reservations` 
  * Returns a list of all reservations in the database. 
  * Ordered by id.
  
### `GET /reservations?date` 
  * Returns a list of all reservations scheduled for the specified date. 
  * Ordered by scheduled time.
  * If any of the queries are a `date` query, this route will override the next route.

### `GET /reservations?validSearchQuery`
  * Returns a list of all reservations that contain a partial match to each of the provided search queries.
  * Ordered by scheduled date starting from the most future date.
  * Any number of queries can be passed in like `/reservations?query1=one&query2=two&query3=three` etc.
  * All queries are treated as strings, and all queries are case insensitive.
  * If any query is invalid, the entire request will be considered invalid.
  * Currently supports the following valid search params:
     * `reservation_id`
     * `created_at`
     * `updated_at`
     * `first_name`
     * `last_name`
     * `mobile_number`
     * `reservation_date`
     * `reservation_time`
     * `people`
     * `status`

### `GET /reservations/:reservation_id`
  * Returns a single reservation object given a valid `reservation_id` param.
  * Request is invalid if the provided reservation_id does not correspond to an existing reservation.

### `POST /reservations`
  * Creates a new reservation using the data provided in the request body data.
  * Returns the newly created reservation object.
  * To be a valid request, the body data must include the following properties:
     * `first_name`
     * `last_name`
     * `mobile_number`
     * `reservation_date`
       * Must be a valid date in the future
     * `reservation_time`
       * Must be a valid time in the future
     * `people`
       * Must be a number greater than zero. 
 * Although not required, you may optionally include the following properties 
     * `reservation_id`
     * `status`
     * `created_at`
     * `edited_at`
* No other properties will be allowed in the request body data. 

### `PUT /reservations/:reservation_id`
* 

<hr/>

## Technologies Used
* Client-side Application made with `React` for state-management and front-end routing.
* UI and CSS styling primarily handled with `Bootstrap`. 
* Back-end API made with `Node` and `Express`.
* API communicates with a `PostgreSQL` database.
* SQL queries in the API  are made with `Knex`.
* Client-side and back-end Applications are both deployed with `Heroku`.
* The PostgreSQL Database is hosted on `ElephantSQL`.
* Unit testing handled with `Jest`.
  * `Supertest` used for back-end tests.
  * `Puppeteer` used for end-2-end tests.
<hr/>


## Local Installation Instructions
1. Fork or Clone the repo.
1. Run `npm install` to install dependencies.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
   * Update the `./back-end/.env` file with the connection URL's to the appropriate PostgreSQL database instances that you wish to use. [`ElephantSQL`](https://www.elephantsql.com/) is a good option for getting a database up and running quickly.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
   * No changes to the `./front-end/.env` are necessary. By default, the backend API will be spun up on `http://localhost:5000`.
1. Run `npm run start:dev` to start the server in development mode.
