import { useState } from "react";
import "./EventCard.css";
import EventDetails from "../EventDetails/EventDetails.jsx";

export default function EventCard(props) {
  const [isClicked, toggleIsClicked] = useState(false);

  function toggle() {
    toggleIsClicked((prevValue) => !prevValue);
  }

    return (
        <div className = "event_card" onClick={toggle}>
            <div className="eventDetailsModal" onClick={(e) => e.stopPropagation()}>
                {isClicked ? 
                <EventDetails 
                eventId = {props.id}
                name={props.name} 
                image={props.image} 
                city = {props.city}
                venue = {props.venue}
                date = {props.date}
                reservationPhone = {props.reservationPhone}
                closeModal={toggle}/> 
                : null}
            </div>
                <img src={props.image}/>
                    <div className="content">
                        <h4 className="event_date">{props.date}</h4>
                        <h1 className="event_name">{props.name}</h1>
                            <div className = "location">
                                <h3 className = "event_city">{props.city}</h3>
                                <svg width="19" height="19" viewBox="0 0 16 16" fill="none" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 7.52786C8 5.44757 6.38329 4 4.05897 4C1.65111 4 0 5.62493 0 7.9976C0 10.447 1.60688 12 4.14251 12C4.76167 12 5.35627 11.9137 5.79853 11.7651V11.1612C5.48894 11.3002 4.82555 11.3913 4.15233 11.3913C2.04914 11.3913 0.692875 10.0731 0.692875 8.02636C0.692875 6.03235 2.07371 4.60395 3.99509 4.60395C5.96069 4.60395 7.30713 5.7879 7.30713 7.51827C7.30713 8.69742 6.90909 9.45956 6.28993 9.45956C5.93612 9.45956 5.73464 9.26303 5.73464 8.9275V6.11384H4.99263V6.69862H4.914C4.72236 6.28161 4.2801 6.02277 3.76413 6.02277C2.75676 6.02277 2.05405 6.83763 2.05405 8.0024C2.05405 9.21989 2.74201 10.0395 3.76413 10.0395C4.33907 10.0395 4.78133 9.76633 4.99263 9.27741H5.07125C5.13022 9.74715 5.5774 10.0827 6.15233 10.0827C7.28256 10.0827 8 9.09047 8 7.52786ZM2.84029 8.02157C2.84029 7.18274 3.2285 6.68424 3.88698 6.68424C4.55528 6.68424 4.9828 7.20192 4.9828 8.02157C4.9828 8.84122 4.55037 9.36369 3.87715 9.36369C3.23342 9.36369 2.84029 8.8556 2.84029 8.02157Z"
                                fill="#757575"/>
                                </svg>
                                <h3 className="event_venue">{props.venue}</h3>
                        </div>
                </div>
            </div>
    )
}
