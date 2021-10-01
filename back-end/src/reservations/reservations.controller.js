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
 * Middleware validation for request bodies
 * Ensures the request body has all the necessary properties before proceeding
 * Then also ensures all of the required data is of the correct data type
 */
function bodyHasAllRequiredFields(req, res, next) {
  const { data = {} } = req.body;

  for (let property of VALID_PROPERTIES) {
    if (!data[property])
      return next({
        status: 400,
        message: `The data in the request body requires a ${property} field.`,
      });
  }

  // Validate the date
  if (Number.isNaN(Date.parse(data.reservation_date)))
    return next({
      status: 400,
      message: `The reservation_date property (${data.reservation_date}) must be a valid date.`,
    });

  // Validate the time
  if (!data.reservation_time.match(/\d\d:\d\d/))
    return next({
      status: 400,
      message: `The reservation_time property (${data.reservation_time}) must be a valid time.`,
    });

  // Validate that people is an integer
  if (!Number.isInteger(data.people))
    return next({
      status: 400,
      message: `The people property (${data.people}) must be an integer.`,
    });

  res.locals.reservation = data;
  return next();
}
/**
 * Middleware validation for request bodies
 * Ensures the request body only has properties that are allowed before proceeding
 */
function bodyHasNoInvalidFields(req, res, next) {
  const { reservation } = res.locals;
  const invalidFields = Object.keys(reservation).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  return next();
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;
  const data = await service.list(date);
  res.json({ data });
}

/**
 * Create handler for new Reservations
 */
async function create(req, res) {
  const { reservation } = res.locals;
  await service.create(reservation);

  const data = { reservation };
  res.status(201).json(data);
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    bodyHasAllRequiredFields,
    bodyHasNoInvalidFields,
    asyncErrorBoundary(create),
  ],
};
