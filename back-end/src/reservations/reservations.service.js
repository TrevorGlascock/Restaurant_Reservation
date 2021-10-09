const db = require("../db/connection");
const tableName = "reservations";
/**
 * List query fetches all of the table data where reservation_date equals the passed in param
 */
function list(reservation_date) {
  if (!reservation_date) return db(tableName).select("*");
  return db(tableName)
    .select("*")
    .orderBy("reservation_time", "ASC")
    .where({ reservation_date });
}

/**
 * Create inserts a new Reservation into the table data
 * and returns the inserted object
 */
function create(reservation) {
  return db(tableName)
    .insert(reservation)
    .returning("*")
    .then((rows) => rows[0]);
}

/**
 * Returns a selected reservation from the database
 * This is primarily used for debugging and for reservation validation in the tables.controller
 */
function read(reservation_id) {
  return db(tableName).where({ reservation_id }).first();
}

module.exports = { list, create, read };
