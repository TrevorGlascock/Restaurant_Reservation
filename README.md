# [Restaurant Reservation Fullstack Web App](https://restaurant-reserve-127-client.herokuapp.com/)

> Full-Stack Web App built from the ground up by Trevor Glascock in Node and React. 
> 
> Allows a user to create Reservations and Tables for their restaurant. 
> 
> On the dashboard page, a user can see all created tables, as well as all the reservations scheduled for the current date. The user can traverse forward and backward by single dates, as well instantly travel to today's date. 
> 
> Booked reservations on the current date can be seated at a table of an appropriate size. Seated tables can also have their corresponding reservation removed and archived out of the Dashboard as a 'finished' reservation.
> 
> Booked reservations can also be freely cancelled or edited. Unlike finished reservations, cancelled reservations will not be archived out of the dashboard.
> 
> On the search page, a user can search for any reservation by multiple different possible search options, defaulting to searching by phone number. If the find feature is used with no search options selected, it will show all reservations ordered by their id.



# Live Deployment Links
* ## [React App Client-Side Deployment](https://restaurant-reserve-127-client.herokuapp.com/)

* ## [Express API Back-End Deployment](https://restaurant-reserve-127-backend.herokuapp.com/)


# General Usage and Screenshots
> Info blurb goes here


<hr/>

# API Documentation
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

### `GET /reservations/:reservation_id`
  * Returns a single reservation object given a valid `reservation_id` param.
  * Request is invalid if the provided reservation_id does not correspond to an existing reservation.
  
### `PUT /reservations/:reservation_id`
* Replaces an existing reservation with the reservation provided in the request body data.
* Returns the modified reservation object.
* Has all the same validation as the above `POST /reservations` route.
* Similar to `GET /reservations/:reservation_id`, the reservation_id in the param must correspond to an existing reservation.

### `PUT /reservations/:reservation_id/status`
* Replaces an existing reservation's status with the status provided in the request body data.
* Returns the entire modified reservation object.
* Similar to `GET /reservations/:reservation_id`, the reservation_id in the param must correspond to an existing reservation.
* The status in the request body data must be one of the 4 valid statuses:
   * `booked` (default state)
   * `seated` (seated at a table)
   * `cancelled` (cancelled by user)
   * `finished` (after leaving a table, reservation is archived)
 * If the reservation being modified is currently `cancelled` or `finished`, it cannot be modified.
 * If the reservation being modified is currently `seated`,  the status in the request body data must be `finished`


### `GET /tables`
  * Returns a list of all restaurant tables in the database. 
  * Ordered alphabetically by the table's name.
  
### `POST /tables`
* Creates a new table using the data provided in the request body data.
* Returns the newly created table object.
* To be a valid request, the body data must include the following properties:
   * `table_name`
   * `capacity`
      * Must be a number greater than zero. 
* Although not required, you may optionally include a `reservation_id` property
   * Note that the `occupied` property is NOT allowed, because it is conditionally set based on the presence of the optional `reservation_id`.
   * A table is only occupied if there is a reservation currently sitting at it.
* No other properties will be allowed in the request body data. 

### `GET /tables/:table_id`
  * Returns a single table object given a valid `table_id` param.
  * Request is invalid if the provided table_id does not correspond to an existing table.

### `GET /tables/:table_id/seat`
* This route is identical to `GET /tables/:table_id` 
* Primarily included as a development/testing convenience.

### `PUT /tables/:table_id/seat`
* Modifies a table to be seated with the reservation_id provided in the request body data.
* Similar to `GET /tables/:table_id`, request is invalid if the table_id in the params does not correspond to an exisiting table.
* Request is invalid if the reservation_id provided in the request body data does not correspond to an existing reservation.
* A table can only be seated if it is not occupied.

### `DELETE /tables/:table_id/seat`
* Modifies a table to set reservation_id to null. 
   >NOTE: This is more of an update than a true delete.
* Similar to `GET /tables/:table_id`, request is invalid if the table_id in the params does not correspond to an exisiting table.
* A table's reservation can only be deleted/unseated if the table is currently occupied.

<hr/>

# Technologies Used
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


# Local Installation Instructions
1. Fork or Clone the repo.
1. Run `npm install` to install dependencies.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
   * Update the `./back-end/.env` file with the connection URL's to the appropriate PostgreSQL database instances that you wish to use. [`ElephantSQL`](https://www.elephantsql.com/) is a good option for getting a database up and running quickly.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
   * No changes to the `./front-end/.env` are necessary. By default, the backend API will be spun up on `http://localhost:5000`.
1. Run `npm run start:dev` to start the server in development mode.
