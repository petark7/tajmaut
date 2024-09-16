import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./SwipeSlider.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EventCard from "../../components/EventCard/EventCard.jsx";
import axios from "axios";

const SwipeSlider = (props) => {
  // const [eventList, setEventList] = useState(null);

  // const fetchData = (numEvents) => {
  //   axios.get(`https://tajmaut.azurewebsites.net/api/Events/FilterEventsByDate?startDate=2023-05-17&endDate=2023-05-18`)
  //   .then (response => {
  //     setEventList(response.data);
  //   })
  //   .catch (error => {
  //     console.log (error.response.data)
  //   })
  // }

  // let events = [];
  // useEffect(() => {
  //   fetchData(6)
  // }, [])

  // if (eventList !== null)
  // {
  //   events = eventList.map(event => {
  //     return (
  //       <div>
  //         <div className="CardSlider-slides">
  //           <EventCard
  //             key={event.eventImage}
  //             image={event.eventImage}
  //             date={event.dateTime}
  //             name={event.name}
  //             city={event.venueCity}
  //             venue={event.venueName}
  //           />
  //         </div>
  //       </div>
  //     );
  //   })
  // }
  
  // useEffect(() => {
  //   setData(props.data)
  // }, props.data)

  var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1700,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 1350,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 950,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 680,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ]
      };

    return (
      <div>
        <div className="cardSlider-container">
          <div className="sliderContainer">
          <div className="cardSlider--title">{props?.title}</div>
            {props.data.length > 0 ? <Slider {...settings}>
             {props.data}
            </Slider> : null}
          </div>
        </div>
      </div>
    );
}
export default SwipeSlider;