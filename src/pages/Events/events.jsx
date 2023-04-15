import { useEffect, useState, Suspense } from "react";
import EventCard from "../../components/EventCard/EventCard.jsx";
import FilterEvents from "../../components/FilterEvents/FilterEvents.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

import axios from "axios";
import "./events.css";
import { Pagination } from "@mui/material";

export default function Events() {
//     const settings = {
//       startDate: null,
//       endDate: null,
//       cityId: null,
//       pageNumber: 1,
//       itemsPerPage: 9,
//     };
  const [eventState, setEventState] = useState(null);
  const [openReserveModal, setOpenReserveModal] = useState(false);
  const [settings, setSettings] = useState(
    {
      startDate: null,
      endDate: null,
      cityId: null,
      pageNumber: 1,
      itemsPerPage: 9,
    },
  );

  const [totalItems, setTotalItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (openReserveModal === false) {
    document.body.style.overflow = 'unset'
  }
  else {
    document.body.style.overflow = 'hidden'
  }
  
  console.log(settings)
  //fetch events (on load) and set to state
  useEffect(() => {
    setIsLoading(true);
    // axios
    //   .get("https://tajmautmk.azurewebsites.net/api/Events/GetAllEvents")
    //   .then((response) => {
    //     setEventState(response.data);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setEventState(null);
    //   });
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
        setIsLoading(false);
        setEventState(response.data.events);
        setTotalItems(response.data.totalItems)
      })
      .catch((error) => {
        setIsLoading(false);
        setEventState(null);
        console.log(error.response.data);
      });
  };

  console.log(eventState);
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
    events = (
      <h1 className="events--noDataText">
        Нема настани со селектираните филтри
      </h1>
    );
  }

  console.log(eventState)
  return (
    <div className="container--events">
      <div className="event-page_content">
        <FilterEvents setEvents={setEvents} />
        <div className="event-list layout-border">
          {isLoading ? <div className="events--loadingSpinner">
          <LoadingSpinner />
          </div> : events}
          {Array.isArray(events) ? 
              <div className="pagination-container">
                <Pagination 
                count={Math.ceil(totalItems / settings.itemsPerPage)} 
                page={settings.pageNumber}
                onChange={(event, value) => {
                    setSettings((prevData) => ({
                        ...prevData,
                        ["pageNumber"] : value
                    }))
                }}
                color="secondary"
                sx={{
                    "& .Mui-selected": {
                        backgroundColor: "#9B85F7 !important", // set the background color for the selected button
                      color: "#fff" // set the text color for the selected button
                    }
                  }} />
              </div>
           : null}
        </div>
      </div>
    </div>
  );
}
