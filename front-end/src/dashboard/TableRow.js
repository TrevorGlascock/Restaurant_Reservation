import React from "react";
import AssignmentButton from "./AssignmentButton/AssignmentButton";

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
export default function TableRow({
  rowObject,
  propNames,
  cancelReservation,
  finishTable,
}) {
  const row = [];
  for (let index in propNames) {
    const propName = propNames[index];
    // data is the value of the rowObject at that property name
    const data = rowObject[propName];

    // if data is a boolean, we will need to disply a status string based on the boolean value
    const isBoolean = typeof data === "boolean";
    const status = data ? "Occupied" : "Free";

    // if data is a boolean, then it's a table status that we push into the row instead
    if (isBoolean)
      row.push(
        <td key={index} data-table-id-status={rowObject.table_id}>
          {status}
        </td>
      );
    // if data is undefined, we render a button of the matching propName type instead
    else if (!data) {
      row.push(
        <td key={index}>
          <AssignmentButton
            rowObject={rowObject}
            finishTable={finishTable}
            cancelReservation={cancelReservation}
            type={propName}
          />
        </td>
      );
    }
    // if data is a reservation status, give it a special attribute for the unit test to find it
    else if (["booked", "seated", "finished", "cancelled"].includes(data))
      row.push(
        <td key={index} data-reservation-id-status={rowObject.reservation_id}>
          {data}
        </td>
      );
    // Otherwise, just push the raw data into the row
    else row.push(<td key={index}>{data}</td>);
  }

  return <tr>{row}</tr>;
}
