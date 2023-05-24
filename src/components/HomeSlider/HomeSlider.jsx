import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import axios from "axios"
import "./HomeSlider.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {getDateTimeDay} from "../../utils/utils.js"

export default function HomeSlider ({numEvents}) {

  const navigate = useNavigate();  
  const [isLoading, setIsLoading] = useState(true);
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

  
  let events = [];
    events = eventData.map((event) => {
      const {date, time, day} = getDateTimeDay(event.dateTime)
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
                {date} {event.venueCity} - {" "}
                {event.venueName}
              </h2>
              <h2 className="slider--time">{time} часот</h2>
              <div className="buttonContainer">
                <button onClick={() => navigate(`/make-reservation/${event.eventId}`)} className="homeSlider-reserveBtn">
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
    axios.get(`https://tajmautmk.azurewebsites.net/api/Events/GetNumberOfEvents?numEvents=${numEvents}`)
    .then((response) => {
      setEventData(response.data);
      setIsLoading(false);
    })
    .catch ((error) => {
      setIsLoading(false);
      console.log(error.response.data)
    })
  }, [])

    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
    };

    return (
      <div className="slider-container">
        {/* LOAD SPINNER IF STILL LOADING */}
        {isLoading ? 
        <Slider {...settings}>
        <div className="slider">
          <div className="slider--content">
            <div className="spinner">
                 <LoadingSpinner style2="homeSlider"/>
            </div>
          </div>
        </div>
      </Slider>
      :
      <Slider {...settings}>
        {events}
    </Slider>}
      </div>
    );
  }
