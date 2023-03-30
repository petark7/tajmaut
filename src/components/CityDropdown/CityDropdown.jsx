import cityArray from "../../data/cities.json"
import "./CityDropdown.css"

export default function CityDropdown (props) {

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
        id="filterEvents-cityDropdown"
        onChange={props.handleChange}
        value={props.formData.city}>
            <option value="">--Одбери--</option>
            {cities}
        </select>
    )
}