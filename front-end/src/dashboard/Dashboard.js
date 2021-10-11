import React, { useEffect, useState } from "react";
import { deleteReservation, listReservations, listTables } from "../utils/api";
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
    seatButton: "",
    first_name: "First Name",
    last_name: "Last Name",
    mobile_number: "Mobile Number",
    reservation_time: "Time of Reservation",
    people: "Party Size",
  };

  const tableCols = {
    finishButton: "",
    table_name: "Table Name",
    capacity: "Maximum Capacity",
    occupied: "Availability",
  };

  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  /**
   * API call to listReservations and listTables
   * Retrieves the data necessary to render the dashboard and stores it in useStatevariables
   */
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  /**
   * Function to call deleteReservation, then to call listTables
   * This function will be prop-drilled into FinishButton
   */
  function finishTable(id) {
    const abortController = new AbortController();
    deleteReservation(id, abortController.signal)
      .catch(console.log)
      .then(() => {
        listTables(abortController.signal).then((data) => {
          console.log(data);
          return setTables(data);
        });
      })
      .catch(setTablesError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3"></div>
      <DateNavigationButton type="previous" currentDate={date} />
      <DateNavigationButton type="today" currentDate={date} />
      <DateNavigationButton type="next" currentDate={date} />
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <h4 className="h4">Reservations for date {date}</h4>
      <DisplayTable data={reservations} objCols={reservationsCols} />
      <h4 className="h4">Tables in the Restaurant</h4>
      <DisplayTable
        data={tables}
        objCols={tableCols}
        finishTable={finishTable}
      />
    </main>
  );
}

export default Dashboard;
