const db = require("../db/connection");
const tableName = "reservations";
/**
 * List query fetches all of the table data as an array
 */
function list() {
  return db.tableName.select("*");
}

module.exports = { list };
