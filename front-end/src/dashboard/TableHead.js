import React from "react";

/**
 * @param type
 *  a string describing the type of object we are building a Table Header for,
 *  this allow us to dynamically assign column lables based on the type
 * @returns {JSX.Element}
 */
export default function TableHead({ type }) {
  const reservationsHead = [
    "First Name",
    "Last Name",
    "Mobile Number",
    "Date of Reservation",
    "Time of Reservation",
    "Party Size",
  ];

  const tableHeaders = reservationsHead.map((collumnName, index) => (
    <th key={index} scope="col">
      {collumnName}
    </th>
  ));

  return (
    <thead>
      <tr>{tableHeaders}</tr>
    </thead>
  );
}
