import React, { useEffect, useState } from "react";
import DisplayTable from "../dashboard/DisplayTable";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import SearchBar from "./SearchBar";

/**
 * Defines the Search page.
 * @returns {JSX.Element}
 */
export function Search() {
  // const [searchOptions, setSearchOptions] = useState();
  const [searchBars, setSearchBars] = useState(["test"]);
  const [searchQueries, setSearchQueries] = useState({ mobile_number: "" }); // useState control form that defines the search query for the API call
  const [reservations, setReservations] = useState(null); // useState Array to store the queried reservations
  const [searchResult, setSearchResult] = useState(""); // useState variable to store the searchResults generated from reservations
  const [errorsArray, setErrorsArray] = useState([]); // All errors in validation, potential API error on submit, and finally the tablesError, if it isn't null

  const queriesChangeHandler = ({ target: { name, value } }) =>
    setSearchQueries((queries) => {
      return {
        ...queries,
        [name]: value,
      };
    });

  const submitHandler = (event) => {
    event.preventDefault(); // prevents the submit button's default behavior
    setErrorsArray([]);
    const abortController = new AbortController();
    listReservations(searchQueries, abortController.signal)
      .then(setReservations)
      .catch((errorObj) => setErrorsArray((errors) => [...errors, errorObj]));
    return () => abortController.abort();
  };

  useEffect(() => {
    const resultTableCols = {
      first_name: "First Name",
      last_name: "Last Name",
      mobile_number: "Mobile Number",
      reservation_date: "Date of Reservation",
      reservation_time: "Time of Reservation",
      people: "Party Size",
      status: "Current Status",
    };
    if (!reservations) setSearchResult("");
    else if (!reservations.length) setSearchResult("No reservations found!");
    else
      setSearchResult(
        <DisplayTable data={reservations} objCols={resultTableCols} />
      );
  }, [reservations]);

  const errorDisplay = errorsArray.map((error, index) => (
    <ErrorAlert key={index} error={error} />
  ));

  const searchBarDisplay = searchBars.map((element, index) => (
    <SearchBar
      lable="Mobile Number"
      name="mobile_number"
      placeholder="Enter a customer's phone number"
      value={searchQueries.mobile_number}
      onChange={queriesChangeHandler}
      key={index}
    />
  ));

  return (
    <main>
      <div className="d-md-flex mb-3"></div>
      {errorDisplay}
      <div className="d-md-flex mb-3">
        <form onSubmit={submitHandler}>
          <fieldset>
            <legend className="h1">Search for Reservations</legend>
            <div className="form-group">{searchBarDisplay}</div>
          </fieldset>
          <div>
            <button type="submit" className="btn btn-info px-3">
              Find
            </button>
          </div>
        </form>
      </div>

      {searchResult}
    </main>
  );
}
