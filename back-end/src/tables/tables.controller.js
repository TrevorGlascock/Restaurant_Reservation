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

/**
 * Create handler for new Tables
 */
async function create(req, res) {
  const table = req.body.data;
  const data = await service.create(table);

  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create),
};
