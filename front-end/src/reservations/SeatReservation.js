import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables } from "../utils/api";

/**
 * Defines the Reservation-Table Assignment Page.
 * @returns {JSX.Element}
 */
export default function SeatReservation() {
  const { reservationId } = useParams();
  const [tableSelection, setTableSelection] = useState("");
  const [tableOptions, setTableOptions] = useState("");
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  useEffect(loadTableNames, []);

  function loadTableNames() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then((data) =>
        data.map((table, index) => (
          <option key={index} value={table}>
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

  const submitHandler = (event) => {
    event.preventDefault(); // prevents the submit button's default behavior
    console.log(tableSelection);
  };

  const cancelHandler = () => {
    // Navigate one step backwards through browser's history
    history.goBack();
  };

  return (
    <main>
      <h1>Seating Reservation #{reservationId}</h1>
      <ErrorAlert error={tablesError} />
      <div className="d-md-flex mb-3">
        <form onSubmit={submitHandler}>
          <fieldset>
            <div className="form-group">
              <label htmlFor="table-select">
                Please assign a table for reservation #{reservationId}
              </label>
              <select
                id="table-select"
                name="table-select"
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
