import React from "react";

/**
 * @param columnLabels
 *  an array of all the column labels that make the table header row
 * @returns {JSX.Element}
 */
export default function TableHead({ columnLabels }) {
  const tableHeader = columnLabels.map((columnName, index) => (
    <th key={index} scope="col">
      {columnName}
    </th>
  ));

  return (
    <thead>
      <tr>{tableHeader}</tr>
    </thead>
  );
}
