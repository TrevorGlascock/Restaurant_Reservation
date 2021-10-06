const db = require("../db/connection");
const tableName = "tables";
/**
 * List query fetches all of the table data sorted by table_name
 */
function list() {
  return db(tableName).select("*").orderBy("table_name");
}

module.exports = { list };
