import React from "react";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

/**
 * Defines the front-end table displaying appropriate data.
 * @param data
 *  the current array of objects to display in table
 * @param objCols
 *  the keys of this object represent the property names of all the columns of this object in the database
 *  the values of this object represent the actual display name used in the TableHead
 * @returns {JSX.Element}
 */
export default function DisplayTable({ data, objCols = {} }) {
  const rows = data?.map((object, index) => (
    <TableRow
      key={index}
      rowObject={object}
      propNames={Object.keys(objCols)}
    />
  ));

  return (
    <table className="table">
      <TableHead columnLabels={Object.values(objCols)} />
      <tbody>{rows}</tbody>
    </table>
  );
}
