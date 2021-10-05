import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";

/**
 * Defines the form for a user to fill out to add a reservation
 * @var formData
 *  a control state variable containing all of the form data
 * @function setFormData
 *  will dynamically change the formData without introducing race conditions
 * @var submissionErrors
 *  a control state variable containing all of the errors recieved from the API call
 * @function setSubmissionErrors
 *  will dynamically change the submissionErrors without introducing race conditions
 * @var history
 *  is used to navigate to appropriate urls for submit and cancel
 * @function submitHandler
 *  will make a post request to the back-end API (onSubmit for form)
 * @function cancelHandler
 *   will send user back one step in history (onClick for cancel button)
 *
 * @returns {JSX.Element}
 */
export default function NewReservation() {
  const defaultFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [submissionErrors, setSubmissionErrors] = useState([]);

  const history = useHistory();

  const formChangeHandler = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  const formIsValid = () => {
    let validForm = true;
    const closedDays = { 2: "Tuesday" }; // Days the restaurant is closed -- Restaurant is currently closed on only closed on Tuesdays (2)
    const startTime = "10:30"; // Start time is the target date at opening time
    const closeTime = "21:30"; // End time is the target date an hour before closing time

    const date = new Date(
      `${formData.reservation_date}T${formData.reservation_time}`
    );
    const today = new Date();
    // If the reservation is in the past, throw an error
    if (Date.parse(date) <= Date.parse(today)) {
      validForm = false;
      setSubmissionErrors((subErrors) => [
        ...subErrors,
        {
          message: `Your reservation cannot be made for a date or time of the past. Please select a future date.`,
        },
      ]);
    }

    // If the restaurant is closed on that day, generate the appropriate error message
    if (closedDays[date.getDay()]) {
      validForm = false;
      setSubmissionErrors((subErrors) => [
        ...subErrors,
        {
          message: _generateClosedMessage(closedDays, date.getDay()),
        },
      ]);
    }

    const startDateTime = new Date(`${formData.reservation_date}T${startTime}`); // Date-time with target date and startTime
    const closeDateTime = new Date(`${formData.reservation_date}T${closeTime}`); //

    // If the restaurant isn't taking reservations for that time, throw an error
    if (
      Date.parse(date) < Date.parse(startDateTime) ||
      Date.parse(date) > Date.parse(closeDateTime)
    ) {
      validForm = false;
      setSubmissionErrors((subErrors) => [
        ...subErrors,
        {
          message: `The restaurant is only taking reservations between ${_convert12HourTime(
            startTime
          )} and ${_convert12HourTime(closeTime)}.`,
        },
      ]);
    }

    return validForm;
  };

  const submitHandler = (event) => {
    event.preventDefault(); // prevents the submit button's default behavior
    setSubmissionErrors([]);

    formData.people = parseInt(formData.people); // people must be parsed into an integer before submiting the data to the backend

    // API util to submit to the backend
    if (formIsValid())
      createReservation(formData)
        .then(() =>
          history.push(`/dashboard?date=${formData.reservation_date}`)
        )
        .catch((errorObj) =>
          setSubmissionErrors((subErrors) => [...subErrors, errorObj])
        );
  };

  // Helper function to generate error message for days the restaurant is closed
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

  //Helper function to convert 24hr time to 12hr time
  function _convert12HourTime(timeString) {
    let hours = Number(timeString.split(":")[0]);
    const minutes = timeString.split(":")[1];
    let meridiem = "am";
    if (hours > 12) {
      hours -= 12;
      meridiem = "pm";
    }
    return `${hours}:${minutes}${meridiem}`;
  }

  const cancelHandler = () => {
    // Navigate one step backwards through browser's history
    history.goBack();
  };

  const errorDisplay = submissionErrors.map((error, index) => (
    <ErrorAlert key={index} error={error} />
  ));

  // JSX return statement to create the form
  return (
    <main>
      <div className="d-md-flex mb-3"></div>
      {errorDisplay}
      <div className="d-md-flex mb-3">
        <form onSubmit={submitHandler}>
          <fieldset>
            <legend className="h1">New Reservation</legend>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                type="text"
                name="first_name"
                placeholder="Enter your first name"
                title="Enter your first name"
                className="form-control"
                value={formData.first_name}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                placeholder="Enter your last name"
                title="Enter your last name"
                className="form-control"
                value={formData.last_name}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile_number">Mobile number</label>
              <input
                id="mobile_number"
                type="text"
                name="mobile_number"
                placeholder="Enter your mobile phone number"
                title="Enter your mobile phone number"
                className="form-control"
                value={formData.mobile_number}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reservation_date">Date of Reservation</label>
              <input
                id="reservation_date"
                type="date"
                name="reservation_date"
                title="Please select the date you wish to reserve"
                className="form-control"
                value={formData.reservation_date}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reservation_time">Time of Reservation</label>
              <input
                id="reservation_time"
                type="time"
                name="reservation_time"
                title="Please select the time you wish to reserve"
                className="form-control"
                value={formData.reservation_time}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="people">Size of Party</label>
              <input
                id="people"
                type="number"
                name="people"
                placeholder="Please enter the size of your party"
                title="Please enter the size of your party"
                className="form-control"
                min="1"
                value={formData.people}
                onChange={formChangeHandler}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary ml-4">
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
