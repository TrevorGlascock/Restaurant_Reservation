import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { convert12HourTime } from "../utils/date-time";

/**
 * Defines the form for a user to fill out to add or edit a reservation
 * @param type
 *  a string defining the form legend. Will either be "New" or "Edit"
 * @param defaultFormData
 *  object passed in from parent component to define the inital values of the form
 * @param APICall
 *  higher-order function passed in as prop from parent component
 *  takes a reservation object as a parameter
 *  the type of API call it will make is defined by the parent component
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
 *  will make API request with APICall function (onSubmit for form)
 * @function cancelHandler
 *   will send user back one step in history (onClick for cancel button)
 *
 * @returns {JSX.Element}
 */
export default function ReservationForm({ type, defaultFormData, APICall }) {
  const [formData, setFormData] = useState(defaultFormData);
  const [submissionErrors, setSubmissionErrors] = useState([]);

  // Reload the formData anytime defaultFormData changes
  useEffect(() => {
    setFormData(defaultFormData);
  }, [defaultFormData]);

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
          message: `The restaurant is only taking reservations between ${convert12HourTime(
            startTime
          )} and ${convert12HourTime(closeTime)}.`,
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
      APICall(formData)
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
      <div className="d-flex flex-column mb-3">
        <h1 className="h1 align-self-center">{type} Reservation</h1>
        <form
          onSubmit={submitHandler}
          className="align-self-center col-10 col-xl-5"
        >
          {errorDisplay}
          <fieldset className="d-flex flex-column ">
            <div className="form-group my-2">
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                type="text"
                name="first_name"
                placeholder="Enter your first name"
                title="Enter your first name"
                className="form-control my-2"
                value={formData.first_name}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                placeholder="Enter your last name"
                title="Enter your last name"
                className="form-control my-2"
                value={formData.last_name}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="mobile_number">Mobile number</label>
              <input
                id="mobile_number"
                type="text"
                name="mobile_number"
                placeholder="Enter your mobile phone number"
                title="Enter your mobile phone number"
                className="form-control my-2"
                value={formData.mobile_number}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="reservation_date">Date of Reservation</label>
              <input
                id="reservation_date"
                type="date"
                name="reservation_date"
                title="Please select the date you wish to reserve"
                className="form-control my-2"
                value={formData.reservation_date}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="reservation_time">Time of Reservation</label>
              <input
                id="reservation_time"
                type="time"
                name="reservation_time"
                title="Please select the time you wish to reserve"
                className="form-control my-2"
                value={formData.reservation_time}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="people">Size of Party</label>
              <input
                id="people"
                type="number"
                name="people"
                placeholder="Please enter the size of your party"
                title="Please enter the size of your party"
                className="form-control my-2"
                min="1"
                value={formData.people}
                onChange={formChangeHandler}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary btn-lg col-5"
                onClick={cancelHandler}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-lg col-5">
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
