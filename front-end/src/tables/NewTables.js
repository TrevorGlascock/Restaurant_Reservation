import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

/**
 * Defines the form for a user to fill out to add a table
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
export default function NewTable() {
  const defaultFormData = {
    table_name: "",
    capacity: 0,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [submissionErrors, setSubmissionErrors] = useState([]);

  const history = useHistory();

  const formChangeHandler = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  const formIsValid = () => {
    let validForm = true;
    return validForm;
  };

  const submitHandler = (event) => {
    event.preventDefault(); // prevents the submit button's default behavior
    setSubmissionErrors([]);

    formData.capacity = parseInt(formData.capacity); // capacity must be parsed into an integer before submiting the data to the backend

    // API util to submit to the backend
    if (formIsValid())
      createTable(formData)
        .then(() => history.push("/dashboard"))
        .catch((errorObj) =>
          setSubmissionErrors((subErrors) => [...subErrors, errorObj])
        );
  };

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
            <legend className="h1">Create a New Table</legend>
            <div className="form-group my-2">
              <label htmlFor="table_name">Table Name</label>
              <input
                id="table_name"
                type="text"
                name="table_name"
                placeholder="Please provide a name for the table"
                title="Please provide a name for the table"
                className="form-control my-2"
                value={formData.table_name}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="capacity">Maximum Capacity</label>
              <input
                id="capacity"
                type="number"
                name="capacity"
                placeholder="Please enter the maximum seating capacity for this table"
                title="Please enter the maximum seating capacity for this table"
                className="form-control my-2"
                min="1"
                value={formData.capacity}
                onChange={formChangeHandler}
                required
              />
            </div>

            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary ms-4 mt-2">
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
