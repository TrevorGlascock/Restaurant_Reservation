# [Restaurant Reservation Front-End](https://restaurant-reserve-127-client.herokuapp.com/)

> The Front-End for the Restaurant Reservation App built by Trevor Glascock. [See the root-directory README for full documentation of Front-End and Back-end.](https://github.com/TrevorGlascock/Restaurant_Reservation)
### Table of Contents
1. [Live Deployment Links](#live-deployment-links)
1. [General Usage and Screenshots](#general-usage-and-screenshots)
1. [Technologies Used](#technologies-used)

<hr/>

# Live Deployment Links

* ### [Front-End Deployment](https://restaurant-reserve-127-client.herokuapp.com/)

* ### [Root Directory for Monorepo](https://github.com/TrevorGlascock/Restaurant_Reservation)


# General Usage and Screenshots
## New Reservation `/reservations/new`
![New Reservation Screenshot](https://raw.githubusercontent.com/TrevorGlascock/Restaurant_Reservation/main/screenshots/new-reservation.png)
> Allows a user to create a new Reservation. 

## New Table `/tables/new`
![New Table Screenshot](https://raw.githubusercontent.com/TrevorGlascock/Restaurant_Reservation/main/screenshots/new-table.png)
> Allows a user to create a new Table.
## Dashboard `/dashboard?date=2021-10-20`
![Dashboard Screenshot](https://raw.githubusercontent.com/TrevorGlascock/Restaurant_Reservation/main/screenshots/dashboard.png)
> Dashboard displays all of the restaurant tables, as well as all the reservations scheduled for the current date defined in the query. If no date is defined, the date will default to today's date. 
> 
> The user can traverse forward and backward one date at a time, as well instantly travel to today's date. 
> 
> From here, the user can seat a booked reservation, edit a booked reservation, cancel a booked reservation, or finish a occupied table.
> 
> NOTE: Reservations that have been finished will not show up on the dashboard.

## Seat Table with a reservation `/reservations/6/seat`
![Seat Table Screenshot](https://raw.githubusercontent.com/TrevorGlascock/Restaurant_Reservation/main/screenshots/seat-table.png)
> Clicking the Seat button next to a reservation on the Dashboard takes the user to that reservation's Seat Page. 
> 
> On this page, the user selects one of the tables from a drop down menu to assign this reservation to.
> 
>  Although the user can freely select any table, the submit button will only allow the user to assign the reservation to a table that can accomodate it.

## Delete/Finish/Unseat a reservation from a table `No Route, the button is on each table in the dashboard`
![Delete/Finish/Unseat Table Screenshot](https://raw.githubusercontent.com/TrevorGlascock/Restaurant_Reservation/main/screenshots/unseat-table.png)
> Clicking on the Finish button displays a confirmation window.
> 
> If the user confirms the action, the corresponding reservation's status is set to `finished` and the table is made free.
> 
>If the confirmation window is cancelled, the button does nothing.

## Search  for Reservations `/search`
![Search Screenshot](https://raw.githubusercontent.com/TrevorGlascock/Restaurant_Reservation/main/screenshots/search.png)
> On the search page, a user can search for any reservation using a wide selection of possible search options. The default setting just has the `Phone Number` option selected. The user can enable or disable a search option by clicking on it.
> 
> If there is at least one search options enabled, the top search bar becomes a required field.
> 
> If the find button is clicked with no search options selected, it will show all reservations ordered by their id.
> 
> NOTE: These searches will work for partial matches, and they are not case sensitive.

## Edit a Booked Reservation `reservations/7/edit`
![Edit Reservation Screenshot](https://raw.githubusercontent.com/TrevorGlascock/Restaurant_Reservation/main/screenshots/edit-reservation.png)
> Allows a user to edit an existing reservation.
> 
> NOTE: Reservations can only be edited if they are booked.

<hr/>

# Technologies Used
* Client-side Application made with `React` for state-management and front-end routing.
* UI and CSS styling primarily handled with `Bootstrap`. 
* Client-side Application id deployed with `Heroku`.
* Unit testing handled with `Jest`.
  * `Puppeteer` used for end-2-end tests.
<hr/>

