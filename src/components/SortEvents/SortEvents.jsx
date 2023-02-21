import "./SortEvents.css"
import DatePickerElements from "../DatePicker/DatePicker"
import cityArray from "../../data/cities.json"
import { useForm } from "react-hook-form";
import React from "react";

const cities = cityArray.map ((city) => {
    return (
        <option value={city.value}>{city.name}</option>
    )
})

export default function SortEvents () {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
      };

    return (
        <div className="sortEvents-container">
             <form onSubmit={handleSubmit(onSubmit)}>
                <Heading label="Период на прикажување"/>
                <DatePickerElements/>
                <Heading label="Локација"/>
                <select name="city" id="sortEvents-cityDropdown" {...register('selected_city')}>
                    {cities}
                </select>
                <input type="submit" value = "Сортирај" className="sortEvents-btnPrikazhi button"/>
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