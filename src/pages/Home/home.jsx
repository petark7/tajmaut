import React, { useState, useEffect } from "react";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import CardSlider from "../../components/CardSlider/CardSlider.jsx";
import EventCard from "../../components/EventCard/EventCard.jsx";

import axios from "axios";
import { getDateTimeDay, getNextDay} from "../../utils/utils.js";
import "./home.css";
import EventDetails from "../../components/EventDetails/EventDetails.jsx";
import VenueCard from "../../components/VenueCard/VenueCard.jsx";
import SwipeSlider from "../../components/SwipeSlider/SwipeSlider.jsx";

export default function Home() {
  const [tomorrowEventState, setTomorrowEventState] = useState([]);
  const [inTwoDaysEventState, setInTwoDaysEventState] = useState([]);
  const [venueListState, setVenueListState] = useState([]);

  const dateTomorrow = getDateTimeDay().dateTomorrowISO.substring(0, 10);
  const dateInTwoDays = getDateTimeDay().dateInTwoDaysISO.substring(0, 10);
  
  const [openReserveModal, setOpenReserveModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
  })

  if (openReserveModal === false) {
    document.body.style.overflow = 'unset'
  }
  else {
    document.body.style.overflow = 'hidden'
  }

  const createCardList = (dataArray) => {
    let cardList = dataArray.map((event) => {
      return (
        <div>
          <div className="CardSlider-slides">
            <EventCard
              opensModal={false}
              key={event.eventId}
              id={event.eventId}
              name={event.name}
              city={event.venueCity}
              venue={event.venueName}
              image={event.eventImage}
              date={`${getDateTimeDay(event.dateTime).date} ${
                getDateTimeDay(event.dateTime).time
              }`}
              reservationPhone={event.venuePhone}
              handleOutsideState={handleReserveClick}
            />
          </div>
        </div>
      );
    });
  return cardList
  }

  // fetch data:
  useEffect(() => {
    // check if event is ongoing. if ongoing -> map it out
    console.log(getDateTimeDay().dateTodayISO)
    axios.get(`https://tajmaut.azurewebsites.net/api/Events/FilterEventsByDate?startDate=${dateTomorrow}&endDate=
    ${getNextDay(getDateTimeDay().dateToday)}`)
      .then(response => {
        setTomorrowEventState(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get(`https://tajmaut.azurewebsites.net/api/Events/FilterEventsByDate?startDate=${dateInTwoDays}
      &endDate=${getNextDay(getDateTimeDay().dateInTwoDays)}`)
      .then(response => {
        setInTwoDaysEventState(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get(`https://tajmaut.azurewebsites.net/api/Venues/GetAllVenues`)
        .then(response => {
          setVenueListState(response.data);
         
        })
        .catch((error) => {
          console.log(error);
        })
  }, [])

  const venueCards =  venueListState.map((venue) => {
    return (
      <div>
      <div className="CardSlider-slides">
      <VenueCard
        data={{
          venueId: venue.venueId,
          venueImage: venue.venueImage,
          venueType: venue.venueType.name,
          venueCity: venue.venueCity.cityName,
          venueName: venue.name,
          venueAddress: venue.address,
        }}
      />
      </div>
      </div>
    );
  })
  const handleReserveClick = (event) => {
            // open the modal outside of the slick slider,
            // then set the props to be used in the EventDetails
            // the contents of the props depend on what event has been clicked (for tomorrow or in 2 days)
            let date = tomorrowEventState.find(object => object.eventId === event.id)?.dateTime;
            if (!date)
            {
              date = inTwoDaysEventState.find(object => object.eventId === event.id)?.dateTime;
            }
            const formattedDate = getDateTimeDay(date).date;
            const time = getDateTimeDay(date).time
            
            setOpenReserveModal(true)
            setCurrentEvent(
              {
                id: event.id,
                name: event.name,
                city: event.city,
                venue: event.venue,
                date: `${formattedDate} ${time}`,
                image: event.image,
                reservationPhone: event.reservationPhone,
              })
  }
  let eventsInTwoDays =  createCardList(inTwoDaysEventState)
  let eventsTomorrow =  createCardList(tomorrowEventState);


return (
  <>
    {openReserveModal === true ? (
      <EventDetails
        eventId={currentEvent.id}
        name={currentEvent.name}
        image={currentEvent.image}
        city={currentEvent.city}
        venue={currentEvent.venue}
        date={`${currentEvent.date}`}
        reservationPhone={currentEvent.reservationPhone}
        closeModal={() => {
          setOpenReserveModal(false);
        }}
      />
    ) : null}
    <div className="home--backgroundImage">
      <HomeSlider numEvents="5" />
    </div>
    <div className="home--daySlider-container">
      <SwipeSlider
       data={eventsTomorrow}
       title={getDateTimeDay().dayTomorrow}
       />

      <SwipeSlider
       data={eventsInTwoDays}
       title={getDateTimeDay().dayInTwoDays}
       />

      <SwipeSlider
        data={venueCards}
        title={"Локали"}
       />
    </div>
  </>
);
}
