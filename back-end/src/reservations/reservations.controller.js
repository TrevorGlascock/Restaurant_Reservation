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
 */
function bodyHasAllRequiredField(req, res, next) {
  const { data = {} } = req.body;

  for (let property of VALID_PROPERTIES) {
    if (!data[property])
      return next({
        status: 400,
        message: `The data in the request body requires a ${property} field.`,
      });
  }

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
  const data = await service.list();
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
    bodyHasAllRequiredField,
    bodyHasNoInvalidFields,
    asyncErrorBoundary(create),
  ],
};
