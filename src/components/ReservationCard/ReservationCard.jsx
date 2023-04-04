import "./ReservationCard.css"
import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";

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
    // set time in the format of 00:00
    let time =  `${timeOfHappening.getHours()}:${(timeOfHappening.getMinutes() < 10) ? `0${timeOfHappening.getMinutes()}` : timeOfHappening.getMinutes()}` ;
    let day = timeOfHappening.getDay();
    switch (day)
    {
        case 0:
        day = "Недела";
        break;

        case 1:
        day = "Понеделник";
        break;

        case 2:
        day = "Вторник";
        break;

        case 3:
        day = "Среда";
        break;

        case 4:
        day = "Четврток";
        break;

        case 5:
        day = "Петок";
        break;

        case 6:
        day = "Сабота";
        break;
    }

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
                        <h4 className="cardContent--dateHappening">{`${day} ${time}`}</h4>
                    </div>
                </div>
                }  
            </div>
    )
}