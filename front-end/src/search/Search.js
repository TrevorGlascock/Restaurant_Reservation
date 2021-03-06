import React, { useCallback, useEffect, useState } from "react";
import DisplayTable from "../dashboard/DisplayTable";
import ErrorAlert from "../layout/ErrorAlert";
import LoadingPrompt from "../loading/LoadingPrompt";
import { listReservations, setReservationStatus } from "../utils/api";
import OptionButton from "./OptionButton";
import SearchBar from "./SearchBar";

/**
 * Defines the Search page.
 * @var {Array} reservations @function setReservations
 *  useState array holding the JSON data retrieved from the API call used in the submit handler
 *  updates in whenever the submit handler is called
 * @var {Object} searchQueries @function setSearchQueries
 *  useState object storing all the query params to be included in the API call
 *  updates whenever a searchbar is typed into, or an option is disabled
 * @var {String|Component} searchResult @function setSearchResult
 *  useState variable that stores the rendered search results in a user-friendly displayTable component, or a message inforing the user no match was found
 *  updates in the useEffect whenever reservations is updated
 * @var {Array} errorsArray @function setErrorsArray
 *  UseState array storing all errors made from the API call
 * @var {Object} searchOptions @function setSearchOptions @var defaultSearchOptions
 *  a useState control object storing all of the checkbox information used to populate optionsPicker
 *  each key represents a searchQuery property name, and each value is another object with two keys
 *    label: a string representing the property it correlates to in a user-friendly readable format
 *    checked: a boolean that acts as the control for the checkbox's status
 * @var {Array} searchBars @function setSearchBars @var defaultSearchBars
 *  a useState control array storing all of the searchBar information use to populate searchBarsDisplay
 *  each element is an object with two keys used to define the specific SearchBarComponent
 *    label: a string representing the type of data in a user-friendly readable format
 *    name: a string representing a valid searchQuery property name
 * @function optionClickHandler
 *  a function that defines the functionality of clicking on a searchOption
 *  will setSearchOptions to either activate or deactivate the button clicked
 *  will setSearchBars to to either add or remove the button's corresponding searchBar
 * @function queriesChangeHandler
 *  a function that defines the behavior of a searchBar's onchange handler
 *  whenever a user types into a searchBar, it will update the searchQueries to reflect what has been typed
 * @var {Array} optionsPicker @var {Array} searchBarsDisplay @var {Array} errorDisplay
 *  made from mapping through useState variables to populate populate itself with corresponding JSX components to be rendered
 * @returns {JSX.Element}
 */
export function Search() {
  const [reservations, setReservations] = useState(null); // useState Array to store the queried reservations
  const [searchQueries, setSearchQueries] = useState({}); // useState control form that defines the search query for the API call
  const [searchResult, setSearchResult] = useState(""); // useState variable to store the searchResults generated from reservations
  const [errorsArray, setErrorsArray] = useState([]); // All errors in validation, potential API error on submit, and finally the tablesError, if it isn't null

  const defaultSearchOptions = {
    first_name: { label: "First Name", checked: false },
    last_name: { label: "Last Name", checked: false },
    mobile_number: { label: "Phone Number", checked: true },
    reservation_time: { label: "Time of Reservation", checked: false },
    people: { label: "Size of Party", checked: false },
    status: { label: "Status", checked: false },
  };
  const defaultSearchBars = [
    {
      label: "Phone Number",
      name: "mobile_number",
    },
  ];

  const [searchOptions, setSearchOptions] = useState(defaultSearchOptions); // Stores the state of all available options, tracking of which ones are currently active
  const [searchBars, setSearchBars] = useState(defaultSearchBars); // Holds an array that is mapped through to generate the dynamic searchBars

  const loadSearchResults = useCallback(() => {
    const abortController = new AbortController();
    setReservations([]);
    listReservations(searchQueries, abortController.signal)
      .then(setReservations)
      .catch((errorObj) => setErrorsArray((errors) => [...errors, errorObj]));
    return () => abortController.abort();
  }, [searchQueries]);

  const cancelReservation = useCallback(
    async (id, controller) => {
      setErrorsArray([]);
      try {
        await setReservationStatus(id, "cancelled", controller.signal);
        loadSearchResults();
      } catch (error) {
        setErrorsArray(error);
      }
      return () => controller.abort();
    },
    [loadSearchResults]
  );

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
      editButton: "",
      cancelButton: "",
    };
    // Before button is clicked, the result component is null
    if (!reservations) setSearchResult(null);
    // If there are no results, show loadingPrompt until API is finished, then show No Reservation Found.
    else if (!reservations.length)
      setSearchResult(
        <LoadingPrompt
          component={
            <h3 className="text-center mt-4">No reservations found!</h3>
          }
        />
      );
    // Otherwise the API call has been completed, and you can show a displayTable of all the reservations
    else
      setSearchResult(
        <DisplayTable
          data={reservations}
          objCols={resultTableCols}
          buttonFunction={cancelReservation}
        />
      );
  }, [reservations, cancelReservation]);

  // Update the reservations data whenever the find button is clicked
  const submitHandler = (event) => {
    event.preventDefault();
    setErrorsArray([]);
    return loadSearchResults();
  };

  /**************************************************************************
   * * * * * * * * * * * * * Dynamic Option Buttons * * * * * * * * * * * * *
   **************************************************************************/

  const optionClickHandler = ({ target }) => {
    const propName = target.id.replace(/-btn$/, "");

    // After clicking a checkbox, flip it's checked value
    setSearchOptions((options) => ({
      ...options,
      [propName]: { ...options[propName], checked: target.checked },
    }));

    // If the option is being enabled, activate it's corresponding searchBar
    if (target.checked)
      return setSearchBars((options) => [
        ...options,
        {
          label: target.name,
          name: propName,
        },
      ]);

    // Otherwise disable the corresponding searchBar and reset the searchQuery that it defined
    setSearchBars((options) => options.filter(({ name }) => name !== propName));
    return setSearchQueries((queries) => ({
      ...queries,
      [propName]: "",
    }));
  };

  // Dynamic search options picker
  const optionsPicker = (
    <div
      className="btn-group flex-wrap "
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

  /**************************************************************************
   * * * * * * * * * * * * * * Dynamic SearchBars * * * * * * * * * * * * * *
   **************************************************************************/
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

  // Dynamic error display
  const errorDisplay = errorsArray.map((error, index) => (
    <ErrorAlert key={index} error={error} />
  ));

  /****************************************************************************
   * * * * * * * * * * * * * * JSX return statement * * * * * * * * * * * * * *
   ****************************************************************************/
  return (
    <main>
      <div className="d-flex mb-3 flex-column">
        <h1 className="h1 align-self-center">Search for Reservations</h1>
        <form onSubmit={submitHandler} className="align-self-center">
          {errorDisplay}
          <fieldset className="d-flex flex-column">
            <div className="col align-self-center">{optionsPicker}</div>
            <div className="col">{searchBarsDisplay}</div>
          </fieldset>
          <button type="submit" className="btn btn-success px-3 mt-2">
            Find
          </button>
        </form>
        <div className="align-self-center col-12 col-xl-10 mt-4">
          {searchResult}
        </div>
      </div>
    </main>
  );
}
