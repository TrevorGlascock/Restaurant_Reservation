const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

/**
 * List handler for tables resource
 */
async function list(req, res) {
  const { date } = req.query;
  const data = await service.list(date);
  res.json({ data });
}

module.exports = { list: asyncErrorBoundary(list) };
