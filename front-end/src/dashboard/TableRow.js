import React from "react";

/**
 * Defines one row of a dynamic table.
 * @param rowObject
 *  An object that contains some of the properties that make up the table's row
 * @param propNames
 *  An array of all the property names in this rowObject that make up the table's row
 * @returns {JSX.Element}
 */
export default function TableRow({ rowObject, propNames }) {
  const row = [];
  for (let index in propNames) {
    const propName = propNames[index];
    row.push(<td key={index}>{rowObject[propName]}</td>);
  }
  return <tr>{row}</tr>;
}
