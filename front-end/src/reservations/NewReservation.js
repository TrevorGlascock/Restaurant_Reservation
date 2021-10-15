import React from "react";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

/**
 * Defines the form to add reservations
 * @var defaultFormData
 *  useState variable to define the starting values of the form
 * @function APICall
 *  higher order function defining the API util to call in this ReservationForm
 * @returns {JSX.Element}
 */
export default function NewReservation() {
  const defaultFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  // Higher order function to create a Reservation
  const APICall = (reservation) => {
    return createReservation(reservation);
  };

  return (
    <ReservationForm
      type="New"
      defaultFormData={defaultFormData}
      APICall={APICall}
    />
  );
}
