const db = require("../db/connection");
const tableName = "reservations";
/**
 * List query fetches all of the table reservations in the table
 * Sorted by their IDs in ascending order
 */
function list() {
  return db(tableName).select("*").orderBy("reservation_id", "ASC");
}

/**
 * Search query fetches all of the table data where reservation_date equals the passed in param
 * Sorted by the time of the reservation in ascending order
 */
function searchByDate(reservation_date) {
  return db(tableName)
    .select("*")
    .where({ reservation_date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time", "ASC");
}
/**
 * Search query fetches all of the table data where mobile_number equals the passed in param
 * Sorted by reservation_date in descending order
 */
function searchByPhone(mobile_number) {
  return db(tableName)
    .select("*")
    .where("mobile_number", "like", `%${mobile_number}%`)
    .orderBy("reservation_date", "DESC");
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

/**
 * Updates status property of selected reservation
 * and returns the entire updated object
 */
function updateStatus(reservation_id, status) {
  return db(tableName)
    .where({ reservation_id })
    .update({ status }, "*")
    .then((rows) => rows[0]);
}

module.exports = {
  list,
  searchByDate,
  searchByPhone,
  create,
  read,
  updateStatus,
};
