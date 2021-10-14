import React from "react";

/**
 * Defines a single Search Bar
 * @param lable
 *  string for the text that labels the button
 * @returns
 */
export default function OptionButton({ label }) {
  return (
    <>
      <input
        type="checkbox"
        className="btn-check"
        id="btn-check-outlined"
        autocomplete="off"
      />
      <label className="btn btn-outline-primary" htmlFor="btn-check-outlined">
        {label}
      </label>
    </>
  );
}
