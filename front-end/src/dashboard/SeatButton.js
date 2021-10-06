import React from "react";

/**
 * Defines a seat button element to dynamically assign a reservation to a table
 * @returns {JSX.Element}
 */
const onClick = () => {
  console.log("Seating Button!");
};
export default function SeatButton() {
  return <button onClick={onClick}>Seat</button>;
}
