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
 * Middleware validation for request parameters
 * Ensures that the table_id param is a valid table
 */
async function tableExists(req, res, next) {
  const { table_id = null } = req.params;
  const table = await service.read(req.params.table_id);

  if (!table)
    return next({ status: 404, message: `Table ${table_id} cannot be found.` });

  res.locals.table = table;
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

/**
 * Update handler for assigning a reservation to a Table
 */
async function assignReservation(req, res) {
  const reservation_id = req.body.data.reservation_id;
  const { table_id } = res.locals.table;
  const data = await service.assignReservation(reservation_id, table_id);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    bodyHasAllRequiredFields,
    bodyHasNoInvalidFields,
    asyncErrorBoundary(create),
  ],
  assignReservation: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(assignReservation),
  ],
};
