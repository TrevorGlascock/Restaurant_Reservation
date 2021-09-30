const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

/**
 * Create handler for new Reservations
 */
async function create(req, res) {
  await service.create(req.body);
  res.sendStatus(201);
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create),
};
