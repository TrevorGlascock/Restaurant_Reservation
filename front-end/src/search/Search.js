import React, { useState } from "react";

/**
 * Defines the Search page.
 * @returns {JSX.Element}
 */
export function Search() {
  const [searchQuery, setSearchQuery] = useState(""); // useState control form that defines the search query for the API call
  const [errorsArray, setErrorsArray] = useState([]); // All errors in validation, potential API error on submit, and finally the tablesError, if it isn't null

  const submitHandler = (event) => {
    event.preventDefault(); // prevents the submit button's default behavior
    setErrorsArray([]);
    console.log(searchQuery);
  };

  return (
    <main>
      <div className="d-md-flex mb-3">
        <form onSubmit={submitHandler}>
          <fieldset>
            <legend className="h1">Search for Reservations</legend>
            <div className="form-group">
              <label htmlFor="mobile_number">Mobile Number</label>
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

            <button type="submit" className="btn btn-primary ">
              Find
            </button>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
