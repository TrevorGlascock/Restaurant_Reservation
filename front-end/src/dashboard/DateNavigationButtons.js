import React from "react";
import { previous, next, today } from "../utils/date-time";

/**
 * Defines one Date Navigation Button
 * @param type
 *  a string describing the type Navigation Button
 * @param currentDate
 *  a string which stores the current date to use as a reference for navigation
 *
 * @var text
 *  a string which represents the text of the button
 *  it is identical to type, but with first letter capitalized
 * @var dateChangeUtils
 *  an object that stores the 3 date Changing Utility functions from "../utils/date-time"
 *  the name of the date-time utility function to use will match this Navigation Button's type
 * @var destination
 *  a string that stores the dynamically assigned url generated from one of the dateChangeUtil functions
 *  the type param matches the name of the dateChangeUtil function we are using to generate this url
 *
 * @function onClickHandler
 *  will navigate to the specified destination location with history object
 *
 * @returns {JSX.Element}
 */
export default function DateNavigationButton({ type, currentDate }) {
  const text = type.slice(0, 1).toUpperCase() + type.slice(1);
  const dateChangeUtils = { previous, next, today };
  const destination = dateChangeUtils[type](currentDate);

  const onClickHandler = () => {
    console.log(destination);
  };

  return (
    <button className="btn btn-secondary mr-3 mb-3" onClick={onClickHandler}>
      {text}
    </button>
  );
}
