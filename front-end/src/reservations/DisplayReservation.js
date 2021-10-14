import React from "react";
import { convert12HourTime, formatAsDate } from "../utils/date-time";

/**
 * Defines a display panel that shows relevant reservation information on the Seat page
 * @returns {JSX.Element}
 */

export default function DisplayReservation({ reservation }) {
  if (!reservation) return null;
  const { first_name, last_name, mobile_number, people, status } = reservation;
  const date = formatAsDate(reservation.reservation_date);
  const time = convert12HourTime(reservation.reservation_time);

  return (
    <div>
      <aside>
        <p>{first_name}</p>
        <p>{last_name}</p>
        <p>{mobile_number}</p>
        <p>{date}</p>
        <p>{time}</p>
        <p>{people}</p>
        <p>{status}</p>
      </aside>
    </div>
  );
}
