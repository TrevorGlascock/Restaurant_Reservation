const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

const VALID_PROPERTIES = ["table_name", "capacity", "occupied"];
const REQUIRED_PROPERTIES = ["table_name", "capacity"];

/**
 * Middleware validation for request bodies
 * Ensures the request body has all the necessary properties before proceeding
 * Then also ensures all of the required data is of the correct data type
 */
function bodyHasAllRequiredFields(req, res, next) {
  const { data = {} } = req.body;

  for (let property of REQUIRED_PROPERTIES) {
    if (!data[property])
      return next({
        status: 400,
        message: `The data in the request body requires a ${property} field.`,
      });
  }

  if (data.table_name.length < 2)
    return next({
      status: 400,
      message: `The 'table_name' property must have a length of two or greater`,
    });

  if (typeof data.capacity !== "number" || data.capacity < 1)
    return next({
      status: 400,
      message: `The 'capacity' property must be a number that is 1 or greater`,
    });

  // data must be a boolean, and will default to false if falsy
  data.occupied = !!data.occupied;
  res.locals.table = data;
  return next();
}

/**
 * Middleware validation for request bodies
 * Ensures the request body only has properties that are allowed before proceeding
 */
function bodyHasNoInvalidFields(req, res, next) {
  const { table } = res.locals;
  const invalidFields = Object.keys(table).filter(
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
  const { table } = res.locals;
  const data = await service.create(table);

  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    bodyHasAllRequiredFields,
    bodyHasNoInvalidFields,
    asyncErrorBoundary(create),
  ],
};
