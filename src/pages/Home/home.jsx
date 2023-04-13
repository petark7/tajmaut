import React, { useState, useEffect } from "react";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import CardSlider from "../../components/CardSlider/CardSlider.jsx";
import EventCard from "../../components/EventCard/EventCard.jsx";
import axios from "axios";
import { getDateTimeDay, getNextDay} from "../../utils/utils.js";
import "./home.css";
import EventDetails from "../../components/EventDetails/EventDetails.jsx";
import utils from "../../utils/utils.js"
import VenueCard from "../../components/VenueCard/VenueCard.jsx";

export default function Home() {
  const [tomorrowEventState, setTomorrowEventState] = useState([]);
  const [inTwoDaysEventState, setInTwoDaysEventState] = useState([]);
  const [venueListState, setVenueListState] = useState([]);

  const dateTomorrow = getDateTimeDay().dateTomorrowISO.substring(0, 10);
  const dateInTwoDays = getDateTimeDay().dateInTwoDaysISO.substring(0, 10);
  
  const [openReserveModal, setOpenReserveModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
  })


  const createCardList = (dataArray) => {
    let cardList = dataArray.map((event) => {
      return (
        <EventCard
       opensModal={false}
       key={event.eventId}
       id={event.eventId}
       name={event.name}
       city={event.venueCity}
       venue={event.venueName}
       image={event.eventImage}
       date={getDateTimeDay(event.dateTime).date}
       reservationPhone={event.venuePhone}
       handleOutsideState={handleReserveClick}
       />
     )
  })
  return cardList
  }

  useEffect(() => {
    // check if event is ongoing. if ongoing -> map it out
    axios.get(`https://tajmautmk.azurewebsites.net/api/Events/FilterEventsByDate?startDate=${dateTomorrow}&endDate=
    ${getNextDay(getDateTimeDay().dateTomorrow)}`)
      .then(response => {
        setTomorrowEventState(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get(`https://tajmautmk.azurewebsites.net/api/Events/FilterEventsByDate?startDate=${dateInTwoDays}
      &endDate=${getNextDay(getDateTimeDay().dateInTwoDays)}`)
      .then(response => {
        setInTwoDaysEventState(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get(`https://tajmautmk.azurewebsites.net/api/Venues/GetAllVenues`)
        .then(response => {
          setVenueListState(response.data);
         
        })
        .catch((error) => {
          console.log(error);
        })
  }, [])

  const venueCards =  venueListState.map((venue) => {
    console.log(venue.venueImage)
    return (
        <VenueCard
      data={{ venueId: venue.venueId, venueImage: venue.venueImage, venueType: venue.venueType.name, venueCity: venue.venueCity.cityName, venueName: venue.name, venueAddress: venue.address }}
    />
      )
  })
  const handleReserveClick = (event) => {
            // open the modal outside of the slick slider,
            // then set the props to be used in the EventDetails
            setOpenReserveModal(true)
            setCurrentEvent(
              {
                id: event.id,
                name: event.name,
                city: event.city,
                venue: event.venue,
                date: event.date,
                image: event.image,
                reservationPhone: event.reservationPhone,
              })
  }

  let eventsTomorrow =  createCardList(tomorrowEventState);
  let eventsInTwoDays =  createCardList(inTwoDaysEventState)

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
      <CardSlider 
      data={eventsTomorrow} 
      title={getDateTimeDay().dayTomorrow} />

      <CardSlider
        data={eventsInTwoDays}
        title={getDateTimeDay().dayInTwoDays}
      />
      
        <CardSlider
        data={venueCards}
        title={"Локали"}
      />
    </div>
  </>
);
}
