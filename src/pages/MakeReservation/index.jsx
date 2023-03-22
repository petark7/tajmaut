import ReservationCard from "../../components/ReservationCard/ReservationCard";
import ReserveForm from "../../components/ReserveForm/ReserveForm";
import ReservationHeading from "../../components/ReservationHeading/ReservationHeading";
import "./MakeReservation.css"

const textFieldStyles = {
    "& .MuiInputBase-root": {
        backgroundColor: "white",
    },
    "& .MuiFormLabel-root": {
    },
    "& .MuiFormLabel-root.Mui-focused": {
        color: 'var(--primaryPurple)'
    },
    "& .MuiFilledInput-root.Mui-focused": {
        color: "#8465ff",
        backgroundColor: "#F6F3FF"
      },
      '& .MuiFilledInput-underline:after': {
        borderBottomColor: 'var(--primaryPurple)',
      },
}

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
