import React from "react";
import TableHead from "./TableHead";

/**
 * Defines the front-end table displaying appropriate data.
 * @param data
 *  the current array of objects to display in table
 * @param type
 *  a string describing the type of object being rendered in each row,
 *  this allow us to choose the type of row component to use
 * @returns {JSX.Element}
 */
export default function DisplayTable({ data, type }) {
  return (
    <table className="table">
      <TableHead type={type} />
    </table>
  );
}
