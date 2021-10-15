import React from "react";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

/**
 * Defines the front-end table displaying appropriate data.
 * @param data
 *  the current array of objects to display in table
 * @param objCols
 *  the keys of this object represent the property names of all the columns of this object in the database
 *  the values of this object represent the actual display name used in the TableHead
 * @var rows
 *  an array of TableRow components that make up the table's body
 * @returns {JSX.Element}
 */
export default function DisplayTable({
  data,
  objCols = {},
  buttonFunction = () => null,
}) {
  const rows = data?.map((object, index) => (
    <TableRow
      key={index}
      rowObject={object}
      propNames={Object.keys(objCols)}
      buttonFunction={buttonFunction}
    />
  ));

  return rows?.length ? (
    <div className="table-responsive">
      <table className="table table-hover">
        <TableHead columnLabels={Object.values(objCols)} />
        <tbody>{rows}</tbody>
      </table>
    </div>
  ) : (
    <h5 className="h5 text-center my-5">No reservations scheduled today!</h5>
  );
}
