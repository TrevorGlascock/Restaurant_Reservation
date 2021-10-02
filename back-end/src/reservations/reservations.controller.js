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

  // Validate that the date is an actual date
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

  // Validate that people is a number
  if (typeof data.people !== "number")
    return next({
      status: 400,
      message: `The people property (${
        data.people
      } of type ${typeof data.people}) must be a number.`,
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
 * Middleware validation for reservation_date and reservation_time properties
 * This middleware will always come after the two generic validations
 * Therefore both properties will exist inside of req.body.data with proper formatting
 *
 * This validation ensures the date and time are not in the past
 * And that both are during a time that the restaurant is open
 *
 * Restaurant's operational dates and times are set at the start of this function
 */
function validateDateTime(req, res, next) {
  // 0 is Sunday -- 6 is Saturday
  const closedDays = { 2: "Tuesday" }; // Days the restaurant is closed -- Restaurant is currently closed on only closed on Tuesdays (2)

  const { reservation_date, reservation_time } = req.body.data;
  const date = new Date(`${reservation_date}T${reservation_time}`);
  const today = new Date();

  if (Date.parse(date) <= Date.parse(today))
    return next({
      status: 400,
      message: `Your reservation cannot be made for a date or time of the past.`,
    });

  if (closedDays[date.getDay()]) {
    const closedDayNames = Object.values(closedDays);
    let closedMessage = `The date you have selected is a ${
      closedDays[date.getDay()]
    }. The restaurant is closed on `;

    if (closedDayNames.length > 1)
      closedMessage = closedDayNames.slice(0, -1).join(", ");

    if (closedDayNames.length > 2) closedMessage += ",";
    if (closedDayNames.length > 1) closedMessage += " and ";

    closedMessage += closedDays[date.getDay()] + ".";
    return next({
      status: 400,
      message: closedMessage,
    });
  }
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
  const data = await service.create(reservation);

  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    bodyHasAllRequiredFields,
    bodyHasNoInvalidFields,
    validateDateTime,
    asyncErrorBoundary(create),
  ],
};
