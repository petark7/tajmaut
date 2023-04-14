import "./EventDetails.css"
import { useNavigate } from "react-router"

export default function EventDetails (props) {
    
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/make-reservation/${props.eventId}`);
    }

    return (
        <>
        <div id="myModal" className="modal" onClick={() => {
                            props.closeModal();
                            }}>
            <div className="modal-content" onClick={(e)=> {e.stopPropagation()}}>
                <div className="line"></div>
                    <div className="close-container">
                        <svg className="close" onClick={() => {
                            props.closeModal();
                            }} width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path className="close" d="M0.82153 0.821407C1.4724 0.170533 2.52768 0.170533 3.17855 0.821407L12 9.6429L20.8215 0.821407C21.4724 0.170533 22.5277 0.170533 23.1786 0.821407C23.8294 1.47228 23.8294 2.52756 23.1786 3.17843L14.3571 11.9999L23.1786 20.8214C23.8294 21.4723 23.8294 22.5276 23.1786 23.1784C22.5277 23.8293 21.4724 23.8293 20.8215 23.1784L12 14.3569L3.17855 23.1784C2.52768 23.8293 1.4724 23.8293 0.82153 23.1784C0.170655 22.5276 0.170655 21.4723 0.82153 20.8214L9.64302 11.9999L0.82153 3.17843C0.170655 2.52756 0.170655 1.47228 0.82153 0.821407Z" fill="black"/>
                        </svg>
                    </div>
                <div className="eventDetails--container">
                    <img className="eventDetailsImg" src={props.image}/>
                        <div className="eventDetailsContent">
                            <div className="title"> 
                            <h1 className="eventDetails--title">{props.name}</h1>

                            </div>

                            <div className="detailsContainer">
                                {/* ADD TIME, NOT JUST DATE */}
                                <UnderlinedLabel label="Кога?" value={props.date}/>
                                <UnderlinedLabel label="Резервации?" value={props.reservationPhone}/>
                                <UnderlinedLabel label="Каде?" value={props.venue}/>
                                <UnderlinedLabel label="Град?" value={props.city}/>
                                
                                <div className="eventDetails--buttonContainer">
                                    <button onClick={handleClick} className="eventDetails-reserveBtn button">Резервирај</button>
                                </div>
                            </div>

                            
                        </div>
                    </div>
            </div>
        </div>

        </>
    )
}

function UnderlinedLabel (props) {
    return (
        <div className="underlinedLabel">
            <h3 className="underlinedLabel--title">{props.label}</h3>
            <div className="underlinedLabel--line"/>
            <h4 className="underlinedLabel--value">{props.value}</h4>
        </div>
    )
}