import "./DatePicker.css"
import DatePicker from "react-multi-date-picker"
import {useState} from "react"
import "./colors/purple.css"

export default function DatePickerElements (props) {
    let [startTime, setStartTime] = useState(); 
    let [endTime, setEndTime] = useState(); 

    const inputStyling = {
        fontFamily: "Ubuntu",
        height: "40px",
        width: "100%",
        borderRadius: "8px",
        fontSize: "15px",
        padding: "3px 10px"
      }

      function setDateFrom (date) {
        props.setFormData ((prevData) => {
          return (
            {
              ...prevData,
               "dateFrom": date.toString(),
            }
          )
          })
      }

      function setDateTo (date) {
        props.setFormData ((prevData) => {
          return (
            {
              ...prevData,
               "dateTo": date.toString(),
            }
          )
          })
      }

    return (
      <div className="container--selectdates">
        <div className="selectdates-element1">
            <div className="selectdates-label">Од</div>
            <DatePicker 
            name="dateFrom"
            className="purple"
            style={inputStyling}    
            format={"DD/MM/YYYY"}
            value={startTime}
            onChange={setDateFrom}

        />
        </div>
  
        <div className="selectdates-element2">
          <div className="selectdates-label">До</div>
            <DatePicker 
            className="purple"
            style={inputStyling}     
            format={"DD/MM/YYYY"}
            value={endTime}
            onChange={setDateTo}
            />
        </div>
      </div>
    );
}

//TODO:
// FUNCTIONS ARE NOW WRITTEN SEPARATELY
// WRITE ONLY ONE FUNCTION FOR BOTH FROM AND TO DATE