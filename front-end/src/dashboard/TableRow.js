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

  return <tr></tr>;
}
