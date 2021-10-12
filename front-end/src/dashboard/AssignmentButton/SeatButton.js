import React from "react";
import { Link } from "react-router-dom";

/**
 * Defines a seat button element to dynamically assign a reservation to a table
 * @param reservation
 *  the reservation object this button corresponds to
 * @var id
 *  the reservation_id destructed from the reservation object
 * @var disabled
 *  a boolean representing whether or not the button should be disabled
 *  SeatButton should be a Link Component ONLY when it is NOT disabled
 * @returns {JSX.Element}
 */

export default function SeatButton({ reservation }) {
  const { reservation_id: id, status } = reservation;
  const href = `/reservations/${id}/seat`;

  const disabled = status === "booked" ? false : true;

  // When disabled, SeatButton is a secondary, disabled button element
  return disabled ? (
    <button className="btn btn-secondary" disabled>
      Seat
    </button>
  ) : (
    // Otherwise it's a Link Component to href styled like a primary button
    <Link className="btn btn-primary" to={href}>
      Seat
    </Link>
  );
}
