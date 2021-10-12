import React from "react";
import { Link } from "react-router-dom";

/**
 * Defines a seat button element to dynamically assign a reservation to a table
 * @param reservation
 *  the reservation object this button corresponds to
 * @var id
 *  the reservation_id destructed from the reservation object
 * @returns {JSX.Element}
 */

export default function SeatButton({ reservation }) {
  const { reservation_id: id, status } = reservation;
  const href = `/reservations/${id}/seat`;
  const buttonStyle = status === "booked" ? "btn-primary" : "btn-secondary";
  const disabled = status === "booked" ? false : true;

  return (
    <Link to={href}>
      <button className={`btn ${buttonStyle}`} disabled={disabled}>
        Seat
      </button>
    </Link>
  );
}
