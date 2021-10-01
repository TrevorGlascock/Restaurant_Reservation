import React from "react";

/**
 * Defines one Date Navigation Button
 * @param type
 *  a string describing the type Navigation Button
 *  The type will also become the literal text of the button
 *
 * @var destination
 *  will dynamically assign a url based on type of the Navigation Button
 *
 * @function onClickHandler
 *  will navigate to the specified destination location with history object
 *
 * @returns {JSX.Element}
 */
export default function DateNavigationButton({ type }) {
  const onClickHandler = () => {};

  return (
    <button className="btn btn-secondary mr-3" onClick={onClickHandler}>
      {type}
    </button>
  );
}
