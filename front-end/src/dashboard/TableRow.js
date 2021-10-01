import React from "react";

/**
 * Defines one row of a dynamic table.
 * @param rowObject
 *  An object who's properties are each a column in this row
 * @param type
 *  a string describing the type of object being rendered in this row,
 *  this allow us to choose which propsArray to use based on the type.
 *  propsArray will define the properties of the object that compose the columns of this row.
 * @returns {JSX.Element}
 */
export default function TableRow({ rowObject, type }) {
  const reservationProps = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];

  const propsArray = type === "reservations" ? reservationProps : [];

  const row = [];
  for (let index in propsArray) {
    const property = propsArray[index];
    row.push(<td key={index}>{rowObject[property]}</td>);
  }
  return <tr>{row}</tr>;
}
