import "./LoadingSpinner.css"

export default function LoadingSpinner(props) {
    let spinnerStyle = {};
    if (props.style2 === "button")
    {
        spinnerStyle = {
            width: "30px",
            height: "30px",
            border: "5px solid #f3f3f3",
            borderTop: "5px solid #777777",
            borderRadius: "50%",
            animation: "spinner 1.5s linear infinite"
          };
    }

    if (props.style2 === "homeSlider") {
        spinnerStyle = {
            width: "180px",
            height: "180px",
            border: "10px solid #ff9939",
            borderTop: "10px solid white",
            borderRadius: "50%",
            animation: "spinner 1.5s linear infinite"
          };
    }


    return (
        <div className="spinner-container">
             <div className="container--selectedEvent">
                <div className="cardContent--makeReservation">
                    <div className="loading-spinner" style={spinnerStyle}/>
                </div>
            </div>
        </div>
    )
}