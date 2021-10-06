import React from "react";

/**
 * Defines the head of a dynamic table containing all the column labels
 * @param columnLabels
 *  an array of all the column labels that make the table header row
 * @var tableHeader
 *  an array of the table head columns which represent the labels of each column in a table's header
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
