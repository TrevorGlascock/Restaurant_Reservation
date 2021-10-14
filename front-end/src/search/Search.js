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
    first_name: { label: "First Name", checked: false },
    last_name: { label: "Last Name", checked: false },
    mobile_number: { label: "Phone Number", checked: true },
    reservation_time: { label: "Time of Reservation", checked: false },
    people: { label: "Size of Party", checked: false },
    status: { label: "Status", checked: false },
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
      reservation_id: "Id #",
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
    const propName = target.id.replace(/-btn$/, "");
    // When the option is unchecked:
    if (!target.checked) {
      // Filter out the matching searchBar
      setSearchBars((options) =>
        options.filter(({ name }) => name !== propName)
      );
      // Set it's corresponding query to an empty string
      setSearchQueries((queries) => ({
        ...queries,
        [propName]: "",
      }));
    }

    // When the option is checked:
    else {
      // Add a new searchBar based on the option clicked
      setSearchBars((options) => [
        ...options,
        {
          label: target.name,
          name: propName,
          placeholder: `Enter a customer's ${target.name.toLowerCase()}`,
        },
      ]);
    }

    // After clicking an option, flip it's checked value
    setSearchOptions((options) => ({
      ...options,
      [propName]: { ...options[propName], checked: target.checked },
    }));
  };

  // Dynamic search options picker
  const optionsPicker = (
    <div
      className="btn-group"
      role="group"
      aria-label="Search options toggle button group"
    >
      {Object.entries(searchOptions).map(
        ([propName, { label, checked }], index) => (
          <OptionButton
            label={label}
            propName={propName}
            checked={checked}
            key={index}
            onChange={optionClickHandler}
          />
        )
      )}
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
