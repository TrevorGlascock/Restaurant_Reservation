import React from "react";
import FinishButton from "./FinishButton";
import SeatButton from "./SeatButton";

/**
 * This component will conditionally render either a SeatButton or a FinishButton
 * @param rowObject
 *  the parent object will either be a reservation or a table, which will define the condition for the render
 * @param table_id
 *  table objects will have a table_id primary key
 * @param reservation_id
 *  reservation objects will have reservation_id primary key
 *  table objects will have a (possibly null) reservation_id foreign key
 * @returns {JSX.Element}
 */

export default function AssignmentButton({
  rowObject: { table_id = null, reservation_id = null },
  finishTable,
}) {
  return table_id ? (
    // Table objects have FinishButtons
    <FinishButton id={table_id} finishTable={finishTable} />
  ) : (
    // Reservation objects have SeatButtons
    <SeatButton id={reservation_id} />
  );
}
