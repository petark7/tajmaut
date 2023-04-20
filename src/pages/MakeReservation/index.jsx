import ReservationCard from "../../components/ReservationCard/ReservationCard";
import ReserveForm from "../../components/ReserveForm/ReserveForm";
import ReservationHeading from "../../components/ReservationHeading/ReservationHeading";
import "./MakeReservation.css"
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";
import NotLoggedModal from "../../components/NotLoggedModal/NotLoggedModal";

export default function MakeReservation () 
{
    document.body.style.overflow = 'unset'
    const context = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(context.authState.authToken != undefined)
    const [showModal, setShowModal] = useState(!isLoggedIn)

    return (
            <div className="background--makeReservation">
                <div className="container--makeReservation">
                    <div className="content--makeReservation">
                   {showModal ?  <div id="myModal" className="modal" onClick={() => {setShowModal(false);
                    }}>
                        <NotLoggedModal setShowModal = {setShowModal} onClick={(e) => e.stopPropagation()}/>
                    </div>
                   : 
                   null}
                        <ReservationHeading />
                        <ReservationCard/>
                    </div>
                    <ReserveForm />
                </div>
            </div>
    )
}
