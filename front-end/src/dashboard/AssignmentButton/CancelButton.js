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

export default function CancelButton({ reservation }) {
  const { reservation_id: id } = reservation;
  const onClick = () => {
    console.log(`Cancel reservation #${id}`);
  };

  return (
    <button type="button" onClick={onClick} className={`btn btn-danger`}>
      Cancel
    </button>
  );
}
