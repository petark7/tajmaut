import "./DatePicker.css"
import DatePicker from "react-multi-date-picker"
import {useState} from "react"
import InputIcon from "react-multi-date-picker/components/input_icon"
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

      function setDate (date, stateKey) {
        props.setFormData ((prevData) => {
          return (
            {
              ...prevData,
              [stateKey]: date.toString(),
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
            onChange={date => setDate(date, 'dateFrom')}
            render={<InputIcon style={inputStyling} />}
        />
        </div>
  
        <div className="selectdates-element2">
          <div className="selectdates-label">До</div>
            <DatePicker 
            className="purple"
            style={inputStyling}     
            format={"DD/MM/YYYY"}
            value={endTime}
            onChange={date => setDate(date, 'dateTo')}
            render={<InputIcon style={inputStyling} />}
            />
        </div>
      </div>
    );
}

//TODO:
// FUNCTIONS ARE NOW WRITTEN SEPARATELY
// WRITE ONLY ONE FUNCTION FOR BOTH FROM AND TO DATE