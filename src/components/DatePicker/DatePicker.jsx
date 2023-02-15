import "./DatePicker.css"
import DatePicker from "react-multi-date-picker"
import {useState} from "react"
import "./colors/purple.css"

export default function DatePickerElements () {
    let [startTime, setStartTime] = useState(new Date()); 
    let [endTime, setEndTime] = useState(new Date()); 
  
    const inputStyling = {
        fontFamily: "Ubuntu",
        height: "40px",
        width: "100%",
        borderRadius: "8px",
        fontSize: "15px",
        padding: "3px 10px"
      }

    function handleStart(startTime) {
      setStartTime(startTime)
    }
  
    function handleEnd(endTime) {
      setEndTime(endTime)
  }
  
    return (
      <div className="container--selectdates">
        <div className="selectdates-element1">
            <div className="selectdates-label">Од</div>
            <DatePicker 
            className="purple"
            style={inputStyling}    
            format={"DD/MM/YYYY"}
            onChange={handleStart}
        />
        </div>
  
        <div className="selectdates-element2">
        <div className="selectdates-label">До</div>
        <DatePicker 
        className="purple"
        style={inputStyling}     
        format={"DD/MM/YYYY"}
        onChange={handleEnd}
        />
        </div>
      </div>
    );
}