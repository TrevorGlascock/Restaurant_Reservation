const db = require("../db/connection");
const tableName = "reservations";
/**
 * List query fetches all of the table data as an array
 */
function list() {
  return db(tableName).select("*");
}

/**
 * Create inserts a new Reservation into the table data
 * and returns the inserted object
 */
function create(NewReservation) {
  return db(tableName)
    .insert(NewReservation)
    .returning("*")
    .then((rows) => rows[0]);
}

module.exports = { list, create };
