import ReservationCard from "../../components/ReservationCard/ReservationCard";
import ReserveForm from "../../components/ReserveForm/ReserveForm";
import ReservationHeading from "../../components/ReservationHeading/ReservationHeading";
import "./MakeReservation.css"


export default function MakeReservation () 
{

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
