import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";

/**
 * Defines the form for a user to fill out to add a reservation
 * formData is a control state variable containing all of the form data
 * history is used to navigate to appropriate urls for submit and cancel
 * submit will make a post request to the back-end API
 */
export default function NewReservation() {
  const defaultFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const history = useHistory();

  const formChangeHandler = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    createReservation(formData)
      .then(history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(console.log);
  };

  const cancelHandler = () => {
    history.goBack();
  };

  return (
    <main>
      <div className="d-md-flex mb-3">
        <form onSubmit={submitHandler}>
          <fieldset>
            <legend className="h1">New Reservation</legend>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                type="text"
                name="first_name"
                placeholder="Enter your first name"
                title="Enter your first name"
                className="form-control"
                value={formData.first_name}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                placeholder="Enter your last name"
                title="Enter your last name"
                className="form-control"
                value={formData.last_name}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile_number">Mobile number</label>
              <input
                id="mobile_number"
                type="text"
                name="mobile_number"
                placeholder="Enter your mobile phone number"
                title="Enter your mobile phone number"
                className="form-control"
                value={formData.mobile_number}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reservation_date">Date of Reservation</label>
              <input
                id="reservation_date"
                type="date"
                name="reservation_date"
                title="Please select the date you wish to reserve"
                className="form-control"
                value={formData.reservation_date}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reservation_time">Time of Reservation</label>
              <input
                id="reservation_time"
                type="time"
                name="reservation_time"
                title="Please select the time you wish to reserve"
                className="form-control"
                value={formData.reservation_time}
                onChange={formChangeHandler}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="people">Size of Party</label>
              <input
                id="people"
                type="number"
                name="people"
                placeholder="Please enter the size of your party"
                title="Please enter the size of your party"
                className="form-control"
                min="1"
                value={formData.people}
                onChange={formChangeHandler}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary ml-4">
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
