import React from "react";
import { Link } from "react-router-dom";
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
 * @var emptyMessage
 *  a conditional JSX component that points the user to the right page to create data whenever it is empty
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
  const emptyMessage = Object.keys(objCols).includes("table_name") ? (
    <>
      <p>Currently there are no tables in the restaurant.</p>
      <Link to="/tables/new">
        Click here to add a table so you can seat a reservation!
      </Link>
    </>
  ) : (
    <>
      <p>No reservations scheduled today.</p>
      <Link to="/reservations/new">Click here to make a new reservation!</Link>
    </>
  );

  return rows?.length ? (
    <div className="table-responsive">
      <table className="table table-hover">
        <TableHead columnLabels={Object.values(objCols)} />
        <tbody>{rows}</tbody>
      </table>
    </div>
  ) : (
    <h5 className="h5 text-center my-5">{emptyMessage}</h5>
  );
}
