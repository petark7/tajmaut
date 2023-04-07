import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios"
import "./HomeSlider.css";

export default function SimpleSlider (props) {

  const numberOfEvents = 4;
  const [eventData, setEventData] = useState([{
    eventId: "",
    eventImage: "",
    eventName: "",
    eventDate: "23/04/23",
    eventDay: "Вторник",
    eventTime: "18:00",
    venueLocation: "",
    venueCity: "",
}])

  const handleClick = () => {
    
  }
  
  let events = [];

    events = eventData.map((event) => {
      return (
        <div className="slider" key={event.eventId}>
          <div className="slider--content">
            <img
              className="slider--img"
              src={event.eventImage}
            ></img>
  
            <div className="slider-content">
              <h1 className="slider--eventTitle">{event.name}</h1>
              <h2 className="slider--dateLocation">
                {event.dateTime} {event.venueCity} - {" "}
                {event.venueName}
              </h2>
              <h2 className="slider--time">18:00 часот</h2>
              <div className="buttonContainer">
                <button onClick={handleClick} className="homeSlider-reserveBtn">
                  Резервирај
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    })


  // Fetch Events
  useEffect(() => {
    axios.get(`https://tajmautmk.azurewebsites.net/api/Events/GetNumberOfEvents?numEvents=${numberOfEvents}`)
    .then((response) => {
      setEventData(response.data);
    })
    .catch ((error) => {
      console.log(error.response.data)
    })
  }, [])



    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {/* <div className="slider">
            <div className="slider--content">
              <img
                className="slider--img"
                src={require("../../img/event_01.jpg")}
              ></img>

              <div className="slider-content">
                <h1 className="slider--eventTitle">{eventData[0].name}</h1>
                <h2 className="slider--dateLocation">{eventData[0].dateTime} {eventData[0].venueCity} - {eventData[0].venueName}</h2>
                <h2 className="slider--time">18:00 часот</h2>
                <div className="buttonContainer">
                <button onClick={handleClick} className="homeSlider-reserveBtn">Резервирај</button>
                </div>
              </div>
            </div>
          </div>

          <div className="slider">
            <div className="slider--content">
              <img
                className="slider--img"
                src={require("../../img/event_01.jpg")}
              ></img>

              <div className="slider-content">
                <h1 className="slider--eventTitle">DJ IRIE SCRATCH SECOND</h1>
                <h2 className="sliderh2">20/01/2023 Битола - Расчекор</h2>
                <h2 className="sliderh2">18:00 часот</h2>
                <div className="buttonContainer">
                <button onClick={handleClick} className="homeSlider-reserveBtn">Резервирај</button>
                </div>
              </div>
            </div>
          </div> */}
          {events}
        </Slider>
      </div>
    );
  }
