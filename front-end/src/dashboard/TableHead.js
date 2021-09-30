import React from "react";

/**
 * @param type
 *  a string describing the type of object we are building a Table Header for,
 *  this allow us to dynamically assign column lables based on the type
 * @returns {JSX.Element}
 */
export default function TableHead({ type }) {
  return (
    <thead>
      <tr></tr>
    </thead>
  );
}
