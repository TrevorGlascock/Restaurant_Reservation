import React from "react";
import { useParams } from "react-router";

/**
 * Defines the Reservation-Table Assignment Page.
 * @returns {JSX.Element}
 */
export default function SeatReservation() {
  const { reservationId } = useParams();
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3"></div>
      <h4 className="h4">Assign a table for reservation #{reservationId}</h4>
    </main>
  );
}
