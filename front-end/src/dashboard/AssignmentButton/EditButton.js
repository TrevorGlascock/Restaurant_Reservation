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
  const { reservation_id: id, status } = reservation;
  const href = `/reservations/${id}/edit`;

  const disabled = status === "booked" ? false : true;

  // When disabled, EditButton is a secondary, disabled button element
  return disabled ? (
    <button className="btn btn-secondary" disabled>
      Edit
    </button>
  ) : (
    // Otherwise it's a Link Component to href styled like a primary button
    <Link className="btn btn-info" to={href}>
      Edit
    </Link>
  );
}
