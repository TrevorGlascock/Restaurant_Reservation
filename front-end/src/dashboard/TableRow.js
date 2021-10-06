import React from "react";

/**
 * Defines one row of a dynamic table.
 * @param rowObject
 *  An object that contains some of the properties that make up the table's row
 * @param propNames
 *  An array of all the property names in this rowObject that make up the table's row
 * @var row
 *  An array of JSX table-data containing all the data of that makes up this row
 * @returns {JSX.Element}
 */
export default function TableRow({ rowObject, propNames }) {
  const row = [];
  for (let index in propNames) {
    const propName = propNames[index];
    const data = rowObject[propName];

    // if data is a boolean, we will need to disply a status string based on the boolean value
    const isBoolean = typeof data === "boolean";
    const status = data ? "Occupied" : "Open";

    row.push(<td key={index}>{isBoolean ? status : data}</td>);
  }
  return <tr>{row}</tr>;
}
