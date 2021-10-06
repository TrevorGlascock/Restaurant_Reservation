import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DisplayTable from "./DisplayTable";
import DateNavigationButton from "./DateNavigationButtons";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const reservationsCols = {
    first_name: "First Name",
    last_name: "Last Name",
    mobile_number: "Mobile Number",
    reservation_date: "Date of Reservation",
    reservation_time: "Time of Reservation",
    people: "Party Size",
  };

  const tableCols = {
    table_name: "Table Name",
    capacity: "Maximum Capacity",
    occupied: "Availability",
  };

  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <DateNavigationButton type="previous" currentDate={date} />
      <DateNavigationButton type="today" currentDate={date} />
      <DateNavigationButton type="next" currentDate={date} />
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <DisplayTable data={reservations} objCols={reservationsCols} />
      <DisplayTable data={tables} objCols={tableCols} />
    </main>
  );
}

export default Dashboard;
