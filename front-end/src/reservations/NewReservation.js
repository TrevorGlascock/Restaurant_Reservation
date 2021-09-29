import React from "react";

export default function NewReservation() {
  return (
    <main>
      <div className="d-md-flex mb-3">
        <form>
          <fieldset>
            <legend className="h1">New Reservation</legend>
            <div className="form-group">
              <label for="first-name">First Name</label>
              <input
                id="first_name"
                type="text"
                name="first_name"
                placeholder="Enter your first name"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label for="last-name">Last Name</label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                placeholder="Enter your last name"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label for="mobile_number">Mobile number</label>
              <input
                id="mobile_number"
                type="text"
                name="mobile_number"
                placeholder="Enter your mobile phone number"
                className="form-control"
                required
              />
            </div>

            <button type="submit">Submit</button>
            <button type="button">Cancel</button>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
