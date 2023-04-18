import ReservationCard from "../../components/ReservationCard/ReservationCard";
import ReserveForm from "../../components/ReserveForm/ReserveForm";
import ReservationHeading from "../../components/ReservationHeading/ReservationHeading";
import "./MakeReservation.css"


export default function MakeReservation () 
{
    document.body.style.overflow = 'unset'

    return (
            <div className="background--makeReservation">
                <div className="container--makeReservation">
                    <div className="content--makeReservation">
                        <ReservationHeading />
                        <ReservationCard/>
                    </div>
                    <ReserveForm />
                </div>
            </div>
    )
}
