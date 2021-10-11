import React from "react";
/**
 * Defines a finish button element to free up an occupied table
 * @param table
 *  the table object this button corresponds to
 * @param finishTable
 *  function defined in src/Dashboard.js and prop-drilled down to here
 *  defines the actual functionality of the button:
 *  removes a currently assigned reservation from a table, and rerenders the tables table
 * @var id
 *  the table_id property destructed from the table object
 * @var occupied
 *  the occupied property destructed from the table object
 *  this boolean is used to change styling dynamically based on occupied status
 * @var buttonStyle
 *  ternary variable used to dynamically change the css class of the button
 *  the condion for this variable is set by the occupied var
 * @function onClick
 *  calls the finishTable function param with id var as it's parameter
 * @returns {JSX.Element}
 */

export default function FinishButton({ table, finishTable }) {
  const { table_id: id, occupied } = table;

  const buttonStyle = occupied ? "btn-danger" : "btn-secondary";

  const onClick = () => {
    finishTable(id);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn ${buttonStyle}`}
      disabled={!occupied}
    >
      Finish
    </button>
  );
}
