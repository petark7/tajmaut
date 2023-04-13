import "./ReservationCard.css"
import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import {getDateTimeDay} from "../../utils/utils.js"

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function ReservationCard () {

    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    useEffect(() => {
        fetch(`https://tajmautmk.azurewebsites.net/api/Events/GetEventByID?eventId=${params.eventID}`)
        .then (res => {
            return res.json();
        })
        .then(data => {
            setEventData(data[0]);
            setIsLoading(false);
        })
    }, [])

    const [eventData, setEventData] = useState({
        restaurantId: "",
        categoryEventId: "",
        name: "",
        description: "",
        eventImage: "",
        dateTime: "",
    })

    let timeOfHappening = new Date (Date.parse(eventData.dateTime));

    return (
            <div className="container--selectedEvent">
                {isLoading ? <LoadingSpinner/> : 
                <div className="cardContent--makeReservation">
                    <img
                        className="cardImage--makeReservation"
                        src={eventData.eventImage}
                        alt="Event Image"
                    />
                    <div className="cardContent--makeReservation">
                        <h3 className="cardContent--title">{eventData.name}</h3>
                        <h4 className="cardContent--dateHappening">{`${getDateTimeDay(timeOfHappening).dayToday} ${getDateTimeDay(timeOfHappening).time}`}</h4>
                    </div>
                </div>
                }  
            </div>
    )
}