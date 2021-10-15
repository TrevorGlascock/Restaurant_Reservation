import React from "react";

/**
 * Defines a single Search Bar
 * @param lable
 *  string for the text that labels the input
 * @param name
 *  string for the property_name and HTML name
 * @param value
 *  string for dynamic form value
 * @param onChange
 *  function defined in parent component to handle changing form state
 * @param required
 *  optional attribute used to conditionally make a searchBar one that is required
 * @var placeholder
 *  string defining the placeholder and title text derived fromn the lowerCase label
 * @returns
 */
export default function SearchBar({
  label = "",
  name = "",
  value = "",
  onChange = () => null,
  required = false,
}) {
  const placeholder = `Enter a customer's ${label.toLowerCase()}`;
  return (
    <div className="form-group my-2 col col-md-10 col-xl-5">
      <label htmlFor={name}>{label}</label>
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
  );
}
