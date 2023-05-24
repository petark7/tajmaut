import cityArray from "../../data/cities.json"
import "./CityDropdown.css"

export default function CityDropdown (props) {

    // const cities = cityArray.map ((city) => {
    //     return (
    //         <option 
    //         key={city.value}
    //         value={city.value}> {city.name}
    //         </option>
    //     )
    // })

    return (
      <select
        name="cityId"
        id="cityDropdown"
        onChange={props.handleChange}
      >
        <option value="0">Цела Македонија</option>
        {props.data.map((city) => (
          <option key={city.venue_CityId} value={city.venue_CityId}>
            {city.cityName}
          </option>
        ))}
      </select>
    );
}