import React from "react";

/**
 * Defines a single Search Bar
 * @param lable
 *  string for the text that labels the button
 * @param propName
 *  string used for definind the id attribute
 * @param checked
 *  boolean used for determining the current state of the button
 * @param onChange
 *  function that defines onChange behavior
 * @returns
 */
export default function OptionButton({
  label = "",
  propName = "",
  checked = false,
  onChange = () => null,
}) {
  return (
    <>
      <input
        type="checkbox"
        className="btn-check"
        id={`${propName}-btn`}
        autoComplete="off"
        onChange={onChange}
        name={label}
        checked={checked}
      />
      <label className="btn btn-outline-primary" htmlFor={`${propName}-btn`}>
        {label}
      </label>
    </>
  );
}
