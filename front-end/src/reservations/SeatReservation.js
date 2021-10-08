import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, seatReservation } from "../utils/api";

/**
 * Defines the Reservation-Table Assignment Page.
 * @returns {JSX.Element}
 */
export default function SeatReservation() {
  const { reservationId } = useParams();
  const [tableSelection, setTableSelection] = useState(""); // Current Selection
  const [tableOptions, setTableOptions] = useState(""); // All the table options to choose from
  const [tablesError, setTablesError] = useState(null); // Potential error from loadTables GET request
  const [submissionErrors, setSubmissionErrors] = useState([]); // All errors in validation, potential API error on submit, and finally the tablesError, if it isn't null

  const history = useHistory();

  useEffect(loadTableNames, []);

  function loadTableNames() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then((data) =>
        data.map((table, index) => (
          <option key={index} value={table.table_id}>
            {table.table_name} - {table.capacity}
          </option>
        ))
      )
      .then(setTableOptions)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  const selectTableHandler = ({ target }) => {
    setTableSelection(target.value);
  };

  const selectionIsValid = () => {
    let validSelection = true;

    return validSelection;
  };

  const submitHandler = (event) => {
    event.preventDefault(); // prevents the submit button's default behavior
    setSubmissionErrors([]);
    if (selectionIsValid())
      seatReservation(reservationId, tableSelection)
        .then(() => history.push(""))
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

  // If there is a tablesError, we add it to the errorDisplay
  if (tablesError)
    errorDisplay.push(<ErrorAlert key="tablesError" error={tablesError} />);

  return (
    <main>
      <h1>Seating Reservation #{reservationId}</h1>
      {errorDisplay}
      <div className="d-md-flex mb-3">
        <form onSubmit={submitHandler}>
          <fieldset>
            <div className="form-group">
              <label htmlFor="table_id">
                Please assign a table for reservation #{reservationId}
              </label>
              <select
                id="table_id"
                name="table_id"
                title="Select a table to assign to this reservation"
                className="form-control"
                value={tableSelection}
                onChange={selectTableHandler}
                required
              >
                <option value="">Please Select a Table</option>
                {tableOptions}
              </select>
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
