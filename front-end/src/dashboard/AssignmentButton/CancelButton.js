import React from "react";

/**
 * Defines a seat button element to dynamically assign a reservation to a table
 * @param reservation
 *  the reservation object this button corresponds to
 * @var id
 *  the reservation_id destructed from the reservation object
 * @function onClick
 *  function containing the actual cancel functionality
 * @returns {JSX.Element}
 */

export default function CancelButton({ reservation, cancelReservation }) {
  const { reservation_id: id, status } = reservation;

  const disabled = status === "booked" ? false : true;

  const onClick = () => {
    cancelReservation(id);
  };

  // When disabled, CancelButton is a secondary, disabled button element
  return disabled ? (
    <button type="button" className="btn btn-secondary" disabled>
      Cancel
    </button>
  ) : (
    // Otherwise it's a danger button with the proper functionality, and an additional attribute so the unit test can locate it
    <button
      type="button"
      onClick={onClick}
      className="btn btn-danger"
      data-reservation-id-cancel={id}
    >
      Cancel
    </button>
  );
}
