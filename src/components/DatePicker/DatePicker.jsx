import "./DatePicker.css"
import DatePicker from "react-multi-date-picker"
import {useState} from "react"
import InputIcon from "react-multi-date-picker/components/input_icon"
import "./colors/purple.css"
import { getDateTimeDay } from "../../utils/utils"
export default function DatePickerElements (props) {
    let [startTime, setStartTime] = useState(getDateTimeDay().dateTodayISO); 
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
            name="startDate"
            className="purple"
            style={inputStyling}    
            format={"YYYY-MM-DD"}
            value={startTime}
            onChange={date => setDate(date, 'startDate')}
            render={<InputIcon style={inputStyling} />}
        />
        </div>
  
        <div className="selectdates-element2">
          <div className="selectdates-label">До</div>
            <DatePicker 
            className="purple"
            style={inputStyling}     
            format={"YYYY-MM-DD"}
            value={endTime}
            onChange={date => setDate(date, 'endDate')}
            render={<InputIcon style={inputStyling} />}
            />
        </div>
      </div>
    );
}

//TODO:
// FUNCTIONS ARE NOW WRITTEN SEPARATELY
// WRITE ONLY ONE FUNCTION FOR BOTH FROM AND TO DATE