import React from "react";

/**
 * Defines a finish button element to free up an occupied table
 * @returns {JSX.Element}
 */

export default function FinishButton({ id }) {
  const onClick = () => {
    console.log(`Finish him: ${id}`);
  };
  return (
    <button type="button" onClick={onClick} className="btn btn-danger">
      Finish
    </button>
  );
}
