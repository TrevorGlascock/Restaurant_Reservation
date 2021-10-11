const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

const VALID_PROPERTIES = [...REQUIRED_PROPERTIES, "status"];

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

  // Validate that the date is in the correct format
  if (!data.reservation_date.match(/\d\d\d\d-\d\d-\d\d/))
    return next({
      status: 400,
      message: `The reservation_date property (${data.reservation_date}) must be a valid date in the format of YYYY-MM-DD`,
    });

  // Validate that the time is in the correct format
  if (!data.reservation_time.match(/^\d\d:\d\d/))
    return next({
      status: 400,
      message: `The reservation_time property (${data.reservation_time}) must be a valid time in the format of HH:MM.`,
    });

  const datetime = `${data.reservation_date}T${data.reservation_time}`;
  if (Number.isNaN(Date.parse(datetime))) {
    return next({
      status: 400,
      message: `The reservation_date and reservation_time property do not make a valid Date-Time string (${datetime}).`,
    });
  }

  // Validate that people is a number
  if (typeof data.people !== "number")
    return next({
      status: 400,
      message: `The people property (${
        data.people
      } of type ${typeof data.people}) must be a number.`,
    });

  // If an optional status is added, only allow it post if the value is 'booked'
  if (data.status && data.status !== "booked")
    return next({
      status: 400,
      message: `Status cannot be set to '${data.status}'. When creating a reservation, it must have the default status of 'booked', or no status at all.`,
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
  const startTime = "10:30"; // Start time is the target date at opening time
  const closeTime = "21:30"; // End time is the target date an hour before closing time

  const { reservation_date, reservation_time } = req.body.data;
  const date = new Date(`${reservation_date}T${reservation_time}`);
  const today = new Date();

  // If the reservation is in the past, throw an error
  if (Date.parse(date) <= Date.parse(today))
    return next({
      status: 400,
      message: `Your reservation cannot be made for a date or time of the past. Please select a future date.`,
    });

  // If the restaurant is closed on that day, generate the appropriate error message
  if (closedDays[date.getDay()]) {
    return next({
      status: 400,
      message: _generateClosedMessage(closedDays, date.getDay()),
    });
  }

  const startDateTime = new Date(`${reservation_date}T${startTime}`); // Date-time with target date and startTime
  const closeDateTime = new Date(`${reservation_date}T${closeTime}`); //

  // If the restaurant isn't taking reservations for that time, throw an error
  if (
    Date.parse(date) < Date.parse(startDateTime) ||
    Date.parse(date) > Date.parse(closeDateTime)
  ) {
    return next({
      status: 400,
      message: `Your reservation cannot be made for that time (${reservation_time}). The restaurant is only taking reservations between ${startTime} and ${closeTime}`,
    });
  }

  return next();
}

/**
 *
 * @param closedDays
 *  an object who's keys are the dayNumber where 0 is sunday
 *  and who's values are the string for the day, such as "Sunday"
 * @param selectedDay
 *  the dayNumber for the date the user has entered
 * @returns
 *  the generated message informing the user what day they have selected and which days the restaurant is closed on.
 */
function _generateClosedMessage(closedDays, selectedDay) {
  // An array of all names of the days the resetaurant is closed
  const closedDayNames = Object.values(closedDays);

  // First sentence
  let closedMessage = `The date you have selected is a ${closedDays[selectedDay]}. `;
  // Start of second sentence
  closedMessage += "The restaurant is closed on ";

  // If the array contains more than 1 dayName, join all of the names with a plural "s" comma except for the last one
  if (closedDayNames.length > 1)
    closedMessage += closedDayNames.slice(0, -1).join("s, ");

  // if the array is more than 2 elements, english grammar dictates there be another comma
  if (closedDayNames.length > 2) closedMessage += "s,";

  // if the array has exactly 2 elements, then add the plural "s" before the " and "
  if (closedDayNames.length === 2) closedMessage += "s";

  // if the array has more than one element, we add a final " and " before listing the last element
  if (closedDayNames.length > 1) closedMessage += " and ";

  // Add the last element
  closedMessage += closedDayNames.slice(-1);

  return closedMessage + "s."; // Return the final message with a plural "s" and a period at the end
}

/**
 * Middleware validation for request parameters
 * Ensures that the reservation_id param corresponds to a valid reservation
 */
async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);

  if (!reservation)
    return next({
      status: 404,
      message: `Reservation ${reservation_id} cannot be found.`,
    });

  res.locals.reservation = reservation;
  return next();
}

/**
 * Middleware validation for the request bodies
 * Ensures that the request body has a status field
 * And Ensures that the status is a valid status
 * Used for updateStatus() requests
 */

function hasValidStatus(req, res, next) {
  const { data: { status } = {} } = req.body;
  if (!status)
    return next({
      status: 404,
      message: `The data in the request body requires a status field.`,
    });

  const validStatuses = ["booked", "seated", "finished"];
  if (!validStatuses.includes(status))
    return next({
      status: 404,
      message: `${status} is an invalid status. The only valid statuses are: '${validStatuses.join(
        "', '"
      )}'.`,
    });
  res.locals.status = status;
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
  const data = await service.create(reservation);
  res.status(201).json({ data });
}

/**
 * Read handler for reading a specified Reservation
 */
async function read(req, res) {
  res.json({ data: res.locals.reservation });
}

/**
 * Update handler for updating reservation status
 */
async function updateStatus(req, res) {
  const { status, reservation } = res.locals;
  const data = await service.updateStatus(reservation.reservation_id, status);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    bodyHasAllRequiredFields,
    bodyHasNoInvalidFields,
    validateDateTime,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), read],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    hasValidStatus,
    asyncErrorBoundary(updateStatus),
  ],
};
