import {useEffect, useState, Suspense} from "react";
import EventCard from "../../components/EventCard/EventCard.jsx";
import FilterEvents from "../../components/FilterEvents/FilterEvents.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

import axios from "axios"
import "./events.css"

export default function Events() {

    const [eventState, setEventState] = useState(null);

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
    const getEventData = () => {
      
    }
    let events = null;
    if (eventState != null) {
        events = eventState.map(event => 
            {
                let date = new Date(event.dateTime).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric'
                  });
                return(<EventCard 
                    key = {event.eventId}
                    id = {event.eventId}
                    name = {event.name}
                    city = "Grad"
                    venue = {event.venueName}
                    image = {event.eventImage}
                    date = {date}
                    reservationPhone = {event.venuePhone}
                    />)
            })
    }

    return (
        <div className="container--events">
              <div className="event-page_content">
                <FilterEvents/>
                <div className="event-list layout-border">
                    {events === null ? <LoadingSpinner/> : events}
                </div>
              </div>
        </div>
    );
  };
  