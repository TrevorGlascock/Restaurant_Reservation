import React from "react";
/**
 * Defines a finish button element to free up an occupied table
 * @returns {JSX.Element}
 */

export default function FinishButton({ table, finishTable }) {
  const { table_id: id, occupied } = table;
  const onClick = () => {
    finishTable(id);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-danger"
      disabled={!occupied}
    >
      Finish
    </button>
  );
}
