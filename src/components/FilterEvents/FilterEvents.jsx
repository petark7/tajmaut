import React, {useState} from "react"
import DatePickerElements from "../DatePicker/DatePicker"
import Heading from "../Heading/"
import CityDropdown from "../CityDropdown/CityDropdown.jsx"

import "./FilterEvents.css"


export default function FilterEvents () {

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
        <div className="filterEvents-container layout-border">
            <form onSubmit={handleSubmit}>
                <Heading label="Период на прикажување"/>
                
                <DatePickerElements 
                formData={formData} 
                setFormData = {setFormData}
                />

                <Heading label="Локација"/>

                <CityDropdown 
                handleChange={handleChange} 
                formData={formData}
                />
                
                <div className="decorativeLine-thin"/>
                <button className="filterEvents-btnPrikazhi button">Прикажи</button>
            </form>
        </div>
    )
}


