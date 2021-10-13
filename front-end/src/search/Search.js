import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";

/**
 * Defines the Search page.
 * @returns {JSX.Element}
 */
export function Search() {
  const [searchQuery, setSearchQuery] = useState(""); // useState control form that defines the search query for the API call
  const [reservations, setReservations] = useState(null); // useState Array to store the queried reservations
  const [searchResult, setSearchResult] = useState(""); // useState variable to store the searchResults generated from reservations
  const [errorsArray, setErrorsArray] = useState([]); // All errors in validation, potential API error on submit, and finally the tablesError, if it isn't null

  const submitHandler = (event) => {
    event.preventDefault(); // prevents the submit button's default behavior
    setErrorsArray([]);
    const abortController = new AbortController();
    listReservations({ mobile_number: searchQuery }, abortController.signal)
      .then(setReservations)
      .catch((errorObj) => setErrorsArray((errors) => [...errors, errorObj]));
    return () => abortController.abort();
  };

  useEffect(() => {
    if (!reservations) setSearchResult("");
    else if (!reservations.length) setSearchResult("No reservations found!");
    else setSearchResult(JSON.stringify(reservations));
  }, [reservations]);

  const errorDisplay = errorsArray.map((error, index) => (
    <ErrorAlert key={index} error={error} />
  ));

  return (
    <main>
      <div className="d-md-flex mb-3"></div>
      {errorDisplay}
      <div className="d-md-flex mb-3">
        <form onSubmit={submitHandler}>
          <fieldset>
            <legend className="h1">Search for Reservations</legend>
            <div className="form-group">
              <label htmlFor="mobile_number">Mobile Number</label>
              <div className="row">
                <div className="col-9">
                  <input
                    id="mobile_number"
                    type="text"
                    name="mobile_number"
                    placeholder="Enter a customer's phone number"
                    title="Enter a customer's phone number"
                    className="form-control"
                    value={searchQuery}
                    onChange={({ target }) => setSearchQuery(target.value)}
                    required
                  />
                </div>
                <div className="col">
                  <button type="submit" className="btn btn-info px-3">
                    Find
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      {searchResult}
    </main>
  );
}
