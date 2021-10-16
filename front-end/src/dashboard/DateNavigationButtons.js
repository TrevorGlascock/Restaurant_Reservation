import React from "react";
import { useHistory } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";

/**
 * Defines one Date Navigation Button
 * @param type
 *  a string describing the type Navigation Button
 * @param currentDate
 *  a string which stores the current date to use as a reference for navigation
 * @var text
 *  a string which represents the text of the button
 *  it is identical to type, but with first letter capitalized
 * @var dateChangeUtils
 *  an object that stores the 3 date Changing Utility functions from "../utils/date-time"
 *  the name of the date-time utility function to use will match this Navigation Button's type
 * @var newDate
 *  a string that stores the date dynamically generated from one of the dateChangeUtil functions
 *  we are using the type param that matches the name of the dateChangeUtil functionto generate this date
 * @var destination
 *  a string that parses the newDate into a url with the correct date query
 * @var history
 *  react-router-dom's UseHistory creates a history object to allow us to navigate to new destination in browser
 * @function onClickHandler
 *  will navigate to the specified destination location using history.push
 * @var buttonStyle
 * string to define the button styling conditionally based on the text variable
 * @returns {JSX.Element}
 */
export default function DateNavigationButton({ type, currentDate }) {
  const text = type.slice(0, 1).toUpperCase() + type.slice(1);
  const dateChangeUtils = { previous, next, today };
  const newDate = dateChangeUtils[type](currentDate);
  const destination = `/dashboard?date=${newDate}`;
  const history = useHistory();

  const onClickHandler = () => {
    history.push(destination);
  };

  const buttonStyle = text === "Today" ? "btn-primary" : "btn-secondary";

  return (
    <button className={`btn ${buttonStyle} me-3 mb-3`} onClick={onClickHandler}>
      {text}
    </button>
  );
}
