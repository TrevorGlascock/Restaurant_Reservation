import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
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
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
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
      <DisplayTable data={reservations} objCols={reservationsCols} />
    </main>
  );
}

export default Dashboard;
