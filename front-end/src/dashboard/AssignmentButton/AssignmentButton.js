import React from "react";
import CancelButton from "./CancelButton";
import EditButton from "./EditButton";
import FinishButton from "./FinishButton";
import SeatButton from "./SeatButton";

/**
 * This component will conditionally render either a SeatButton or a FinishButton
 * @param rowObject
 *  the entire object passed in from the parent component
 *  will either be a table object or a reservation object
 * @param type
 *  a string representing the type of button to conditionally render.
 *  defaults to a "finishButton"
 * @returns {JSX.Element}
 */

export default function AssignmentButton({ rowObject, buttonFunction, type }) {
  switch (type) {
    case "seatButton":
      return <SeatButton reservation={rowObject} />;
    case "editButton":
      return <EditButton reservation={rowObject} />;
    case "cancelButton":
      return (
        <CancelButton
          reservation={rowObject}
          cancelReservation={buttonFunction}
        />
      );
    default:
      return <FinishButton table={rowObject} finishTable={buttonFunction} />;
  }
}
