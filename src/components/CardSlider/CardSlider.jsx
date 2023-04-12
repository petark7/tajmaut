import Slider from "react-slick";
import "./CardSlider.css";
import axios from "axios"
import { useEffect, useState, Suspense } from "react";
import EventCard from "../EventCard/EventCard";
import EventDetails from "../EventDetails/EventDetails";
import { getDateTimeDay } from "../../utils/utils.js"

export default function CardSlider({ day }) {

  const [openReserveModal, setOpenReserveModal] = useState(false);
  const [eventState, setEventState] = useState([

  ]);
  const [currentEvent, setCurrentEvent] = useState({

  })

  const dateToday = new Date();
  const dateTomorrow = new Date(dateToday);
  dateTomorrow.setDate(dateToday.getDate() + 1);
  const dateInTwoDays = new Date(dateToday);
  dateInTwoDays.setDate(dateToday.getDate() + 2)

  //fetch events and set to state
  useEffect(() => {
    const startDate = getDateTimeDay().dateTodayISO.substring(0, 10);
    const endDate = getDateTimeDay().dateTomorrowISO.substring(0, 10);

    // check if event is ongoing. if ongoing -> map it out
    axios.get(`https://tajmautmk.azurewebsites.net/api/Events/FilterEventsByDate?startDate=${startDate}&endDate=${endDate}`)
      .then(response => {
        setEventState(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])
  console.log(eventState)
  if (day == "nextDay") {

    const startDate = getDateTimeDay().dateTodayISO.substring(0, 10);
    const endDate = getDateTimeDay().dateTomorrowISO.substring(0, 10);

    // check if event is ongoing. if ongoing -> map it out
    // axios.get(`https://tajmautmk.azurewebsites.net/api/Events/FilterEventsByDate?startDate=${startDate}&endDate=${endDate}`)
    // .then (response => {
    //   console.log(response.data)
    // })
    // .catch(error => {
    //   console.log(error.response.data)
    // })
    // fetch events for next day
  }
  if (day == "inTwoDays") {

  }
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 4,
    draggable: false,
    prevArrow: <div className="slick-prev-days"></div>,
    nextArrow: <div className="slick-next-days"></div>,
  };
  let events = null;
  if (eventState != null) {
    events = eventState.map(event => {
      let date = new Date(event.dateTime).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      if (event.statusEvent != "Ended") {
        return (
          <div className="cardslider--dayCard" onClick={() => {
            // open the modal outside of the slick slider,
            // then set the props to be used in the EventDetails
            setOpenReserveModal(true)
            setCurrentEvent(
              {
                eventId: event.eventId,
                name: event.name,
                city: event.venueCity,
                venue: event.venueName,
                date: date,
                image: event.eventImage,
                reservationPhone: event.venuePhone,
              })
          }}>
            <EventCard
              opensModal={false}
              key={event.eventId}
              id={event.eventId}
              name={event.name}
              city={event.venueCity}
              venue={event.venueName}
              image={event.eventImage}
              date={date}
              reservationPhone={event.venuePhone}
            />
          </div>
        )
      }
    })
  }
  return (
    <div className="cardslider-container">
      {openReserveModal === true ? <EventDetails
        eventId={currentEvent.eventId}
        name={currentEvent.name}
        image={currentEvent.image}
        city={currentEvent.city}
        venue={currentEvent.venue}
        date={currentEvent.date}
        reservationPhone={currentEvent.reservationPhone}
        closeModal={() => { setOpenReserveModal(false) }} />
        : null}
      <div className="cardslider--day">Петок</div>
      <div className="cardslider--cardsContainer">
        <div className="cardslider--cards">
          <Slider
            {...settings}
            style={{
              width: "1000px",
              maxWidth: "1000px",
            }}
          >
            {events}
          </Slider>
        </div>
      </div>
    </div>
  );
}
