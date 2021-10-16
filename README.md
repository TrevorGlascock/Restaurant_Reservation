# Restaurant Reservation Fullstack Web App
<hr/>

## Live Deployment

<hr/>

## API Documentation

<hr/>

## Screenshots and General Usage

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
