import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, readReservation, seatReservation } from "../utils/api";
import DisplayReservation from "./DisplayReservation";

/**
 * Defines the Reservation-Table Assignment Page.
 * @returns {JSX.Element}
 */
export default function SeatReservation() {
  const { reservationId } = useParams();
  const [reservation, setReservation] = useState();
  const [tables, setTables] = useState([]);
  const [tableSelection, setTableSelection] = useState(""); // Current Selection
  const [tableOptions, setTableOptions] = useState(""); // All the table options to choose from
  const [errorsArray, setErrorsArray] = useState([]); // All errors in validation, potential API error on submit, and finally the tablesError, if it isn't null

  const history = useHistory();

  useEffect(loadTables, []);
  useEffect(loadReservation, [reservationId]);
  useEffect(loadTableSelection, [tables]);

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then(setTables)
      .catch((errorObj) => setErrorsArray((errors) => [...errors, errorObj]));
    return () => abortController.abort();
  }

  function loadReservation() {
    const abortController = new AbortController();
    readReservation(reservationId)
      .then(setReservation)
      .catch((errorObj) => setErrorsArray((errors) => [...errors, errorObj]));
    return () => abortController.abort();
  }

  function loadTableSelection() {
    const loadedOptions = tables?.map((table, index) => (
      <option key={index} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    ));
    setTableOptions(loadedOptions);
  }

  const selectTableHandler = ({ target }) => {
    setTableSelection(target.value);
  };

  const selectionIsValid = () => {
    let validSelection = true;
    const table = tables.find(
      (currentTable) => currentTable.table_id === Number(tableSelection)
    );

    if (table.occupied) {
      validSelection = false;
      setErrorsArray((subErrors) => [
        ...subErrors,
        {
          message: `"${table?.table_name}" is currently occupied, and cannot be seated.`,
        },
      ]);
    }

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

  const submitHandler = (event) => {
    event.preventDefault(); // prevents the submit button's default behavior
    setErrorsArray([]);
    if (selectionIsValid())
      seatReservation(reservationId, tableSelection)
        .then(() => history.push(""))
        .catch((errorObj) =>
          setErrorsArray((subErrors) => [...subErrors, errorObj])
        );
  };

  const cancelHandler = () => {
    // Navigate one step backwards through browser's history
    history.goBack();
  };

  const errorDisplay = errorsArray.map((error, index) => (
    <ErrorAlert key={index} error={error} />
  ));

  return (
    <main>
      <h1>Seating Reservation #{reservationId}</h1>
      {errorDisplay}
      <div className="d-md-flex mb-3">
        <form onSubmit={submitHandler}>
          <fieldset>
            <div className="form-group my-2">
              <label htmlFor="table_id">
                Please assign a table for reservation #{reservationId}
              </label>
              <select
                id="table_id"
                name="table_id"
                title="Select a table to assign to this reservation"
                className="form-control my-2"
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
      </div>
      <DisplayReservation reservation={reservation} />
    </main>
  );
}
