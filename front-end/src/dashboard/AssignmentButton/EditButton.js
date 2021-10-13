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

export default function EditButton({ reservation }) {
  const { reservation_id: id } = reservation;
  const href = `/reservations/${id}/edit`;

  // When disabled, SeatButton is a secondary, disabled button element
  return (
    <Link className="btn btn-info" to={href}>
      Edit
    </Link>
  );
}
