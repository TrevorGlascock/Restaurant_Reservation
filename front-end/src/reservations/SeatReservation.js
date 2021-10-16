import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, readReservation, seatReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import DisplayReservation from "./DisplayReservation";

/**
 * Defines the Reservation-Table Assignment Page.
 * @returns {JSX.Element}
 */
export default function SeatReservation() {
  const { reservationId } = useParams();
  const [reservation, setReservation] = useState(); // Reservation to be seated
  const [tables, setTables] = useState([]); // All of the tables
  const [tableSelection, setTableSelection] = useState(""); // Current Selection
  const [tableOptions, setTableOptions] = useState(""); // All the table options to choose from
  const [errorsArray, setErrorsArray] = useState([]); // All errors in validation, potential API error on submit, and finally the tablesError, if it isn't null

  const history = useHistory();

  useEffect(loadTables, []); // Load all tables from API on page load
  useEffect(loadReservation, [reservationId]); // Load the currnet reservation whenever reservationId param changes
  useEffect(loadTableSelection, [tables]); // Repopulate the option picker choices whenever tables changes

  // Fetches all of the tables as an array of raw table object data
  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then(setTables)
      .catch((errorObj) => setErrorsArray((errors) => [...errors, errorObj]));
    return () => abortController.abort();
  }

  // Fetches the current reservation object based on param
  function loadReservation() {
    const abortController = new AbortController();
    readReservation(reservationId)
      .then(setReservation)
      .catch((errorObj) => setErrorsArray((errors) => [...errors, errorObj]));
    return () => abortController.abort();
  }

  // Converts the array of tables into options for an option picker in JSX
  function loadTableSelection() {
    const loadedOptions = tables?.map((table, index) => (
      <option key={index} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    ));
    setTableOptions(loadedOptions);
  }

  // Table selection must be valid before we seat a reservation there
  const selectionIsValid = () => {
    let validSelection = true;
    const table = tables.find(
      (currentTable) => currentTable.table_id === Number(tableSelection)
    );
    // Table must be unoccupied
    if (table.occupied) {
      validSelection = false;
      setErrorsArray((subErrors) => [
        ...subErrors,
        {
          message: `"${table?.table_name}" is currently occupied, and cannot be seated.`,
        },
      ]);
    }

    // Table must be big enough to accomodate reservation
    if (table.capacity < reservation.people) {
      validSelection = false;
      setErrorsArray((subErrors) => [
        ...subErrors,
        {
          message: `"${table?.table_name}" has a maximum capacity of ${table?.capacity}. This table cannot accomodate the ${reservation.people} people in reservation #${reservation.reservation_id}.`,
        },
      ]);
    }

    return validSelection;
  };

  // Whenever the option picker form is changed, record the new selection in the useState variable
  const selectTableHandler = ({ target }) => {
    setTableSelection(target.value);
  };

  // On submit, validate the selection, seatReservation, then navigate to the dashboard
  const submitHandler = (event) => {
    event.preventDefault();
    setErrorsArray([]);
    if (selectionIsValid())
      seatReservation(reservationId, tableSelection)
        .then(() =>
          history.push(
            `/dashboard?date=${formatAsDate(reservation.reservation_date)}`
          )
        )
        .catch((errorObj) =>
          setErrorsArray((subErrors) => [...subErrors, errorObj])
        );
  };

  // On cancel, navigate backwards in history
  const cancelHandler = () => {
    history.goBack();
  };

  const errorDisplay = errorsArray.map((error, index) => (
    <ErrorAlert key={index} error={error} />
  ));

  return (
    <main>
      <div className="d-flex flex-column mb-3 justify-content-around ">
        <h1 className="align-self-center">
          Seating Reservation #{reservationId}
        </h1>
        <div className="col-8 col-xl-10 align-self-center">
          {errorDisplay}
          <div className="d-flex flex-column flex-xl-row">
            <form onSubmit={submitHandler} className="col mx-4">
              <fieldset>
                <div className="form-group my-2">
                  <label htmlFor="table_id">
                    Please assign a table for reservation #{reservationId}
                  </label>
                  <select
                    id="table_id"
                    name="table_id"
                    title="Select a table to assign to this reservation"
                    className="form-select my-2"
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
            <div className="col mx-4">
              <DisplayReservation reservation={reservation} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
