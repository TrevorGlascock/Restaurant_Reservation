const db = require("../db/connection");
const tableName = "tables";
/**
 * List query fetches all of the table data sorted by table_name
 */
function list() {
  return db(tableName).select("*").orderBy("table_name");
}

/**
 * Create inserts a new Table into the table data
 * and returns the inserted object
 */
function create(table) {
  return db(tableName)
    .insert(table)
    .returning("*")
    .then((rows) => rows[0]);
}

/**
 * Assign a foreign key reservation_id to the corresponding table
 * and returns the entire updated object
 */
function assignReservation(reservation_id, table_id) {
  return db(tableName).where({ table_id }).update({ reservation_id }, "*");
}

module.exports = { list, create, assignReservation };
