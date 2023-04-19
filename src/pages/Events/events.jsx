import { useEffect, useState, Suspense } from "react";
import EventCard from "../../components/EventCard/EventCard.jsx";
import FilterEvents from "../../components/FilterEvents/FilterEvents.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import { getDateTimeDay } from "../../utils/utils.js";
import axios from "axios";
import "./events.css";
import { Pagination } from "@mui/material";

export default function Events() {

  const [eventState, setEventState] = useState([]);
  const [settings, setSettings] = useState(
    {
      startDate: getDateTimeDay().dateTodayISO,
      endDate: null,
      cityId: null,
      pageNumber: 1,
      itemsPerPage: 9,
    },
  );

  const [totalItems, setTotalItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  //fetch events (on load) and set to state
  useEffect(() => {
    setIsLoading(true);
    setEvents(settings)
  }, [settings.pageNumber]);

  //setEvents(eventState);
  const setEvents = (eventData) => {
    setIsLoading(true);
    axios
      .post(
        "https://tajmautmk.azurewebsites.net/api/Events/FilterEvents",
        eventData
      )
      .then((response) => {
        console.log(`eventdata: ${JSON.stringify(eventData)}, response: ${JSON.stringify(response.data)}`)
        setIsLoading(false);
        setEventState(response.data.items);
        setTotalItems(response.data.totalItems)
      })
      .catch((error) => {
        setIsLoading(false);
        setEventState(null);
        console.log(error.response.data);
      });
  };

 
  let events = null;
  if (eventState != null) {
    events = eventState.map((event) => {
      let date = new Date(event.dateTime).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return (
        <EventCard
          key={event.eventId}
          id={event.eventId}
          name={event.name}
          city={event.venueCity}
          venue={event.venueName}
          image={event.eventImage}
          date={date}
          reservationPhone={event.venuePhone}
        />
      );
    });
  } else if (eventState == null && isLoading == false) {
    console.log(`${eventState}, loading: ${isLoading}`)
    events = (
      <h1 className="events--noDataText">
        Нема настани со селектираните филтри
      </h1>
    );
  }


  return (
    <div className="container--events">
      <div className="event-page_content">
        <FilterEvents setEvents={setEvents} settings={settings} setSettings={setSettings} eventState={eventState} />
        <div className="event-list layout-border">
          {isLoading ? (
            <div className="events--loadingSpinner">
              <LoadingSpinner />
            </div>
          ) : (
            events
          )}
          {Array.isArray(events) ? (
            <div className="pagination-container">
              <Pagination
                count={Math.ceil(totalItems / settings.itemsPerPage)}
                page={settings.pageNumber}
                onChange={(event, value) => {
                  setSettings((prevData) => ({
                    ...prevData,
                    ["pageNumber"]: value,
                  }));
                }}
                color="secondary"
                sx={{
                  "& .Mui-selected": {
                    backgroundColor: "#9B85F7 !important", // set the background color for the selected button
                    color: "#fff", // set the text color for the selected button
                  },
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
