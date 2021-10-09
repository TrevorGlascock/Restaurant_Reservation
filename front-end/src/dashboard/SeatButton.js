import React from "react";
import { Link } from "react-router-dom";

/**
 * Defines a seat button element to dynamically assign a reservation to a table
 * @returns {JSX.Element}
 */

export default function SeatButton({ id }) {
  const href = `/reservations/${id}/seat`;
  return (
    <Link className="btn btn-primary" to={href}>
      Seat
    </Link>
  );
}
