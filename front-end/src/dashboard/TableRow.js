import React from "react";
import AssignmentButton from "./AssignmentButton/AssignmentButton";
import CancelButton from "./AssignmentButton/CancelButton";
import EditButton from "./AssignmentButton/EditButton";

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
export default function TableRow({ rowObject, propNames, finishTable }) {
  const row = [];
  for (let index in propNames) {
    const propName = propNames[index];
    // data is the value of the rowObject at that property name
    const data = rowObject[propName];

    // if data is a boolean, we will need to disply a status string based on the boolean value
    const isBoolean = typeof data === "boolean";
    const status = data ? "Occupied" : "Free";

    // If there is a table_id, the object is a table, otherwise it's a reservation
    const id = rowObject.table_id
      ? rowObject.table_id
      : rowObject.reservation_id;

    // if data is a boolean, push the status into the row
    if (isBoolean)
      row.push(
        <td key={index} data-table-id-status={id}>
          {status}
        </td>
      );
    else if (!data) {
      // if data is undefined, we will need to conditionally render a type of button
      if (propName === "seatButton" || propName === "finishButton")
        row.push(
          <td key={index} data-reservation-id-status={id}>
            <AssignmentButton rowObject={rowObject} finishTable={finishTable} />
          </td>
        );
      else if (propName === "cancelButton")
        row.push(
          <td key={index} data-reservation-id-status={id}>
            <CancelButton reservation={rowObject} />
          </td>
        );
      else
        row.push(
          <td key={index} data-reservation-id-status={id}>
            <EditButton reservation={rowObject} />
          </td>
        );
    }
    // if data is a reservation status, we need to give it a special attribute for the unit test to find it
    else if (
      data === "booked" ||
      data === "seated" ||
      data === "finished" ||
      data === "cancelled"
    )
      row.push(
        <td key={index} data-reservation-id-status={id}>
          {data}
        </td>
      );
    // Otherwise, just push the raw data into the row
    else row.push(<td key={index}>{data}</td>);
  }
  return <tr>{row}</tr>;
}
