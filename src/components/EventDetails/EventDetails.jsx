import "./EventDetails.css"

export default function EventDetails (props) {
    return (
        <>
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close" onClick={props.closeModal}>&times;</span>
                <UnderlinedLabel label="Кога?" value="петок - 23/4/2022"/>
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