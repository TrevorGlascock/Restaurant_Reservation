const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

/**
 * Middleware validation for request bodies to ensure it is a proper reservation
 */
function validateReservation(req, res, next) {
  const { data: reservation = {} } = req.body;
  const invalidFields = Object.keys(reservation).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  res.locals.reservation = reservation;
  return next();
}

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
  await service.create(res.locals.reservation);
  res.sendStatus(201);
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [validateReservation, asyncErrorBoundary(create)],
};
