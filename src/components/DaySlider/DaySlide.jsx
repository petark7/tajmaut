import Slider from "react-slick";
import "./DaySlider.css";
import axios from "axios"
import {useEffect, useState, Suspense} from "react";
import EventCard from "../EventCard/EventCard";

export default function DaySlider () {
  
  const [eventState, setEventState] = useState([
    {
      eventId: 0,
      name: "",
      venueCity: "",
      venueName: "",
      eventImage: "asdas",
      date: "",
      venuePhone: "",
    }
  ]);

  //fetch events and set to state
  useEffect(()=> {
      axios.get('https://tajmautmk.azurewebsites.net/api/Events/GetAllEvents')
      .then(response => {
          console.log(response.data)
          setEventState(response.data);
      })
      .catch ((error) => {
          console.log (error);
      }) 
  }, [])

    const settings = {
      infinite: true,
      speed: 1000,
      slidesToShow: 3.99,
      slidesToScroll: 4,
      prevArrow: <div className="slick-prev-days"></div>,
      nextArrow: <div className="slick-next-days"></div>,
            responsive: [
        {
          breakpoint: 1524,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    let events = null;
    if (eventState != null) {
        events = eventState.map(event => 
            {
                let date = new Date(event.dateTime).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric'
                  });
                return(
                  <div className="dayslider--dayCard">
                    <EventCard 
                    key = {event.eventId}
                    id = {event.eventId}
                    name = {event.name}
                    city = {event.venueCity}
                    venue = {event.venueName}
                    image = {event.eventImage}
                    date = {date}
                    reservationPhone = {event.venuePhone}
                    />
                  </div>
                )
            })
    }
    return (
      <div className="dayslider-container">
        <div className="dayslider--day">Петок</div>
        <div className="dayslider--cardsContainer">
          <div className="dayslider--cards">
            <Slider
              {...settings}
              style={{
                width: "1000px",
                maxWidth: "100%",
              }}
            >
              {events}
            </Slider>
          </div>
        </div>
      </div>
    );
}
