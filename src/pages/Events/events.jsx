import EventCard from "../../components/EventCard/EventCard.jsx";
import eventData from "../../data/mockdata.json"
import "./events.css"

export default function Events() {

    const events = eventData.map(event => 
        {
            return(<EventCard 
                key = {event.id}
                name = {event.name}
                city = {event.location.city}
                venue = {event.location.venue}
                image = {event.poster_image}
                date = {event.date}
                />)
        })

    return (
        <div className="container--events">
              <div className="event-list">
                    {events}
              </div>
        </div>
    );
  };
  