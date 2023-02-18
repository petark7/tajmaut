import "./EventDetails.css"

export default function EventDetails (props) {
    return (
        <>
        <div id="myModal" class="modal">
            <div class="modal-content">
                <div className="line"></div>
                <div className="eventDetails--container">
                    <img className="eventDetailsImg" src={require(`../../img/${props.image}`)}/>
                        <div className="eventDetailsContent">
                            <div className="detailsContainer">
                                <UnderlinedLabel label="Кога?" value="петок - 23/4/2022"/>
                                <UnderlinedLabel label="Резервации?" value="075 357 878"/>
                                <UnderlinedLabel label="Каде?" value="Ноќен клуб - „Расчекор“"/>
                                <UnderlinedLabel label="Град?" value="Битола"/>
                                
                                <div className="eventDetails--buttonContainer">
                                    <button className="eventDetails-reserveBtn button">Резервирај</button>
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