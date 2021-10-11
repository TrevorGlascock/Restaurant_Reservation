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
  const { reservation_id: id } = reservation;
  const href = `/reservations/${id}/seat`;
  return (
    <Link className="btn btn-primary" to={href}>
      Seat
    </Link>
  );
}
