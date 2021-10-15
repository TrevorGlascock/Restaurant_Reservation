import React from "react";
import { convert12HourTime, formatAsDate } from "../utils/date-time";

/**
 * Defines a display panel that shows relevant reservation information on the Seat page
 * @returns {JSX.Element}
 */

export default function DisplayReservation({ reservation }) {
  if (!reservation) return null;
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    people,
    status,
  } = reservation;
  const date = formatAsDate(reservation.reservation_date);
  const time = convert12HourTime(reservation.reservation_time);

  return (
    <div className="col">
      <table className="table table-secondary table-hover">
        <thead className="text-muted">Reservation #{reservation_id} Info</thead>
        <tbody>
          <tr>
            <td>First Name</td>
            <td>{first_name}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{last_name}</td>
          </tr>
          <tr>
            <td>Mobile Phone</td>
            <td>{mobile_number}</td>
          </tr>
          <tr>
            <td>Date of Reservation</td>
            <td>{date}</td>
          </tr>
          <tr>
            <td>Time of Reservation</td>
            <td>{time}</td>
          </tr>
          <tr>
            <td>Size of Party</td>
            <td>{people}</td>
          </tr>
          <tr>
            <td>Status of Reservation</td>
            <td>{status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
