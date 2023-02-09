import "./css/schedule.css"
import Event from "../components/Event.jsx"

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
        <div className="mainContainer">
            <Event/>
        </div>

    )
}