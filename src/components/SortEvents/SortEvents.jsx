import React, {useState} from "react"
import DatePickerElements from "../DatePicker/DatePicker"

import "./SortEvents.css"
import cityArray from "../../data/cities.json"

const cities = cityArray.map ((city) => {
    return (
        <option value={city.value}>{city.name}</option>
    )
})

export default function SortEvents () {

    const [formData, setFormData] = useState(
        {
            dateFrom: "",
            dateTo: "",
            city: ""
        }
    )

    function handleSubmit (event) {
        event.preventDefault()
        alert(JSON.stringify(formData))
    }

    function handleChange (event) {
        
        const {name, value} = event.target;

        setFormData((prevFormData) => {
            return (
                {
                    ...prevFormData,
                    [name]: value
                }
            )
        })
    }

    return (
        <div className="sortEvents-container layout-border">
            <form onSubmit={handleSubmit}>
                <Heading label="Период на прикажување"/>
                <DatePickerElements formData={formData} setFormData = {setFormData}/>
                <Heading label="Локација"/>
                <CityDropdown handleChange={handleChange} formData={formData}/>
                <div className="decorativeLine-thin"/>
                <button className="sortEvents-btnPrikazhi button">Прикажи</button>
            </form>
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

function CityDropdown (props) {

    const cities = cityArray.map ((city) => {
        return (
            <option 
            key={city.value}
            value={city.value}> {city.name}
            </option>
        )
    })

    return (
        <select 
        name="city" 
        id="sortEvents-cityDropdown"
        onChange={props.handleChange}
        value={props.formData.city}>
            <option value="">--Одбери--</option>
            {cities}
        </select>
    )
}