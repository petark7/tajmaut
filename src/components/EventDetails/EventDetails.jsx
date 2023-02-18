import "./EventDetails.css"

export default function EventDetails (props) {
    return (
        <>
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close" onClick={props.closeModal}>&times;</span>
                <p>{props.name}</p>
            </div>
        </div>

        </>
    )
}