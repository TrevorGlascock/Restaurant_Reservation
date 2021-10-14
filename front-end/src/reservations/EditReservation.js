import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { readReservation, updateReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ReservationForm from "./ReservationForm";

/**
 * Defines the form to edit reservations
 * @var reservationId
 *  the reservationId pulled from the Route Params
 *  defines the reservation we are editing and pulling default data from
 * @var defaultFormData
 *  useState variable to define the starting values of the form
 * @function setDefaultFormData
 *  useState function to change the state of defaultFormData
 * @function APICall
 *  higher order function defining the API util to call in this ReservationForm
 * @returns {JSX.Element}
 */
export default function EditReservation() {
  const { reservationId } = useParams();
  const [defaultFormData, setDefaultFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  });

  // Update the defaultFormData each time the reservationId changes
  useEffect(() => {
    readReservation(reservationId)
      .then((reservation) => {
        // Format the reservation_date Date object into a YYYY-MM-DD string
        reservation.reservation_date = formatAsDate(
          reservation.reservation_date
        );
        return reservation;
      })
      .then(setDefaultFormData);
  }, [reservationId]);

  // Higher order function to update the Reservation
  const APICall = (reservation) => {
    return updateReservation(reservationId, reservation);
  };

  return (
    <ReservationForm defaultFormData={defaultFormData} APICall={APICall} />
  );
}
