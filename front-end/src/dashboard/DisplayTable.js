import React from "react";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

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
  const rows = data?.map((object, index) => (
    <TableRow data={object} key={index} />
  ));

  return (
    <table className="table">
      <TableHead type={type} />
      {rows}
    </table>
  );
}
