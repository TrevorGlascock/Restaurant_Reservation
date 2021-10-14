import React, { useEffect, useState } from "react";
import DisplayTable from "../dashboard/DisplayTable";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import OptionButton from "./OptionButton";
import SearchBar from "./SearchBar";

/**
 * Defines the Search page.
 * @returns {JSX.Element}
 */
export function Search() {
  const [searchOptions, setSearchOptions] = useState({
    mobile_number: true,
    first_name: false,
    last_name: false,
    status: false,
    people: false,
    reservation_time: false,
  });
  const [searchBars, setSearchBars] = useState([
    {
      label: "Mobile Number",
      name: "mobile_number",
      placeholder: "Enter a customer's phone number",
    },
  ]);
  const [searchQueries, setSearchQueries] = useState({ mobile_number: "" }); // useState control form that defines the search query for the API call
  const [reservations, setReservations] = useState(null); // useState Array to store the queried reservations
  const [searchResult, setSearchResult] = useState(""); // useState variable to store the searchResults generated from reservations
  const [errorsArray, setErrorsArray] = useState([]); // All errors in validation, potential API error on submit, and finally the tablesError, if it isn't null

  const submitHandler = (event) => {
    event.preventDefault(); // prevents the submit button's default behavior
    setErrorsArray([]);
    const abortController = new AbortController();
    listReservations(searchQueries, abortController.signal)
      .then(setReservations)
      .catch((errorObj) => setErrorsArray((errors) => [...errors, errorObj]));
    return () => abortController.abort();
  };

  // Update the search results anytime reservations changes
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

  // Dynamic error display
  const errorDisplay = errorsArray.map((error, index) => (
    <ErrorAlert key={index} error={error} />
  ));

  const optionClickHandler = ({ target }) => {
    // When the option is unchecked:
    if (!target.checked) {
      // Filter out the matching searchBar
      setSearchBars((options) =>
        options.filter(({ name }) => name !== target.name)
      );
      // Set it's corresponding query to an empty string
      setSearchQueries((queries) => ({
        ...queries,
        [target.name]: "",
      }));
    }

    // When the option is checked:
    else {
      // Add a new searchBar based on the option clicked
      setSearchBars((options) => [
        ...options,
        {
          label: target.name,
          name: target.name,
          placeholder: `Enter a customer's ${target.name}`,
        },
      ]);
    }

    // After clicking an option, flip it's checked value
    setSearchOptions((options) => ({
      ...options,
      [target.name]: target.checked,
    }));
  };

  // Dynamic search options picker
  const optionsPicker = (
    <div
      className="btn-group"
      role="group"
      aria-label="Search options toggle button group"
    >
      {Object.entries(searchOptions).map(([label, checked], index) => (
        <OptionButton
          label={label}
          checked={checked}
          key={index}
          onChange={optionClickHandler}
        />
      ))}
    </div>
  );

  const queriesChangeHandler = ({ target: { name, value } }) =>
    setSearchQueries((queries) => ({
      ...queries,
      [name]: value,
    }));

  // Dynamic SearchBars Display
  const searchBarsDisplay = searchBars.map(
    ({ label, name, placeholder }, index) => (
      <SearchBar
        label={label}
        name={name}
        placeholder={placeholder}
        value={searchQueries[name]}
        onChange={queriesChangeHandler}
        key={index}
        required={index === 0}
      />
    )
  );

  return (
    <main>
      <div className="d-md-flex mb-3"></div>
      {errorDisplay}
      <div className="d-md-flex mb-3">
        <form onSubmit={submitHandler}>
          <fieldset>
            <legend className="h1">Search for Reservations</legend>
            {optionsPicker}
            {searchBarsDisplay}
          </fieldset>
          <div>
            <button type="submit" className="btn btn-success px-3 mt-2">
              Find
            </button>
          </div>
        </form>
      </div>
      {searchResult}
    </main>
  );
}
