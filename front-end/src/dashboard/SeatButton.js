import React from "react";
import { Link } from "react-router-dom";

/**
 * Defines a seat button element to dynamically assign a reservation to a table
 * @returns {JSX.Element}
 */

export default function SeatButton() {
  return (
    <Link className="btn btn-primary" to="test">
      Seat
    </Link>
  );
}
