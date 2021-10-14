import React from "react";

/**
 * Defines a single Search Bar
 * @param lable
 *  string for the text that labels the button
 * @returns
 */
export default function OptionButton({
  label = "",
  checked = false,
  onChange = () => null,
}) {
  return (
    <>
      <input
        type="checkbox"
        className="btn-check"
        id={`${label}-btn`}
        autoComplete="off"
        onChange={onChange}
        checked={checked}
      />
      <label className="btn btn-outline-primary" htmlFor={`${label}-btn`}>
        {label}
      </label>
    </>
  );
}
