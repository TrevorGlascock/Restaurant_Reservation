import React from "react";

/**
 * Defines a single Search Bar
 * @param lable
 *  string for the text that labels the input
 * @param name
 *  string for the property_name and HTML name
 * @param placeholder
 *  string defining the placeholder and title text
 * @param value
 *  string for dynamic form value
 * @param onChange
 *  function defined in parent component to handle changing form state
 * @returns
 */
export default function SearchBar({
  lable,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{lable}</label>
      <div className="row">
        <div className="col-9">
          <input
            id={name}
            type="text"
            name={name}
            placeholder={placeholder}
            title={placeholder}
            className="form-control"
            value={value}
            onChange={onChange}
            required
          />
        </div>
      </div>
    </div>
  );
}
