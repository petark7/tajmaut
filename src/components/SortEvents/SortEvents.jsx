import "./SortEvents.css"
import DatePickerElements from "../DatePicker/DatePicker"
import cityArray from "../../data/cities.json"

export default function SortEvents () {
    return (
        <div className="sortEvents-container">
                <Heading label="Период на прикажување"/>
                <DatePickerElements/>
                <Heading label="Локација"/>
                <CityDropdown/>
            <button className="sortEvents-btnPrikazhi button">Прикажи</button>
        </div>
    )
}

function Heading (props) {
    return (
        <div className="sortEvents-heading">
            <h1 className="datePickLabel--labelContent">{props.label}</h1>
            <div className="decorativeLine"/>
        </div>
    )
}

function CityDropdown () {

    const cities = cityArray.map ((city) => {
        return (
            <option value={city.value}>{city.name}</option>
        )
    })

    return (
        <select name="city" id="sortEvents-cityDropdown">
            {cities}
        </select>
    )
}