import React from "react";
/**
 * Defines a finish button element to free up an occupied table
 * @returns {JSX.Element}
 */

export default function FinishButton({ id, finishTable }) {
  const onClick = () => {
    finishTable(id);
  };
  return (
    <button type="button" onClick={onClick} className="btn btn-danger">
      Finish
    </button>
  );
}
