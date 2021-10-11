import React from "react";
import FinishButton from "./FinishButton";
import SeatButton from "./SeatButton";

/**
 * This component will conditionally render either a SeatButton or a FinishButton
 * @param rowObject
 *  the entire object passed in from the parent component
 *  will either be a table object or a reservation object
 * @var table_id
 *  destructed from rowObject param to distinguish between the types of objects
 *  table objects will have a table_id primary key
 *  reservation objects will have a null table_id
 * @returns {JSX.Element}
 */

export default function AssignmentButton({ rowObject, finishTable }) {
  const { table_id = null } = rowObject;
  return table_id ? (
    // Table objects have FinishButtons
    <FinishButton table={rowObject} finishTable={finishTable} />
  ) : (
    // Reservation objects have SeatButtons
    <SeatButton reservation={rowObject} />
  );
}
