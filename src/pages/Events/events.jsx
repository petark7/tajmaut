import EventCard from "../../components/EventCard/EventCard.jsx";
import FilterEvents from "../../components/FilterEvents/FilterEvents.jsx";
import eventData from "../../data/events.json"
import "./events.css"

export default function Events() {

    const events = eventData.map(event => 
        {
            return(<EventCard 
                key = {event.id}
                id = {event.id}
                name = {event.name}
                city = {event.location.city}
                venue = {event.location.venue}
                image = {event.poster_image}
                date = {event.date}
                />)
        })

    return (
        <div className="container--events">
              <div className="event-page_content">
                <FilterEvents/>
                <div className="event-list layout-border">
                    {events}
                </div>
              </div>
        </div>
    );
  };
  