import React from "react";

/**
 * Defines one row of a dynamic table.
 * @param data
 *  An object who's properties are each a column in this row
 * @param type
 *  a string describing the type of object being rendered in this row,
 *  this allow us to choose the type of row component to use
 * @returns {JSX.Element}
 */
export default function TableRow({ data, type }) {
  const reservationKeys = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];
  const row = [];
  for (let key of reservationKeys) {
    row.push(<td>{data[key]}</td>);
  }
  return <tr>{row}</tr>;
}
