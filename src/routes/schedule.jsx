import "./css/schedule.css"
import Event from "../components/Event.jsx"
import eventData from "../data/mockdata.json"
import Navbar from "../components/Navbar"
export default function Schedule () {
    const events = eventData.map(event => 
    {
        return(<Event 
            key = {event.id}
            name = {event.name}
            city = {event.location.city}
            venue = {event.location.venue}
            image = {event.poster_image}
            date = {event.date}
            />)
    })
    return (
        <div className="container--events_page">
            <Navbar/>
            <div className="container--events">
                <div className="event_list">
                        {events}
                </div> 
            </div>
        </div>

    )
}