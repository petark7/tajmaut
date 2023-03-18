import "./ReservationCard.css"
import {useParams} from "react-router-dom";
import { Suspense, useEffect, useState } from "react";

export default function ReservationCard () {

    const params = useParams();
    useEffect(() => {
        fetch(`https://tajmautmk.azurewebsites.net/api/Events/GetEventByID?eventId=${params.eventID}`)
        .then (res => {
            return res.json();
        })
        .then(data => {
            setEventData(data[0]);
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
    let time = timeOfHappening.toLocaleTimeString('mk-MK').toString().slice(0, -3);
    let day = timeOfHappening.getDay().toString();
    switch (day)
    {
        case "0":
        day = "Недела";

        case "1":
        day = "Понеделник";

        case "2":
        day = "Вторник";

        case "3":
        day = "Среда";

        case "4":
        day = "Четврток";

        case "5":
        day = "Петок";

        case "6":
        day = "Сабота";
    }

    return (
            <div className="container--selectedEvent">
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
            </div>
    )
}