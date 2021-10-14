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
  label = "",
  name = "",
  placeholder = "",
  value = "",
  onChange = () => null,
  required = false,
}) {
  return (
    <div className="form-group my-2">
      <label htmlFor={name}>{label}</label>
      <div className="row">
        <div className="col-9">
          <input
            id={name}
            type="text"
            name={name}
            placeholder={placeholder}
            title={placeholder}
            className="form-control my-2"
            value={value}
            onChange={onChange}
            required={required}
          />
        </div>
      </div>
    </div>
  );
}
