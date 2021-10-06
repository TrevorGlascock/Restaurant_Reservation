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

module.exports = { list, create };
