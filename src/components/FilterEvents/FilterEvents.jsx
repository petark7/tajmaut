import React, {useState, useEffect} from "react"
import DatePickerElements from "../DatePicker/DatePicker"
import Heading from "../Heading/"
import CityDropdown from "../CityDropdown/CityDropdown.jsx"

import "./FilterEvents.css"
import axios from "axios"

// API DATA:
// {
//     "pageNumber": 0,
//     "itemsPerPage": 0,
//     "categoryId": 0,
//     "cityId": 0,
//     "startDate": "2023-04-14T20:56:19.759Z",
//     "endDate": "2023-04-14T20:56:19.759Z"
//   }

export default function FilterEvents ({setEvents}) {

    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState(
        {
            startDate: null,
            endDate: null,
            cityId: null,
            pageNumber: 1,
            itemsPerPage: 9,
            categoryId: null,
        }
    )
        console.log(formData);
    
    // fetch cities to send to CityDropdown component
    useEffect(() => {
        fetchCities();
      }, []);

      const fetchCities = () => {
        axios
          .get("https://tajmautmk.azurewebsites.net/api/Venues/GetAllVenueCities")
          .then((response) => {
            setCities(response.data);
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      };
      
    function handleSubmit (event) {
        event.preventDefault()
        setEvents(formData);
    }

    function handleChange (event) { 
        const {name, value} = event.target;
        // if (value == "0") {
        //     value = null;
        // }
        console.log(value)
        setFormData((prevFormData) => {
            if (value == "0") {
                return (
                    {
                        ...prevFormData,
                        [name]: null
                    }
                )
            }
            else {
                return (
                    {
                        ...prevFormData,
                        [name]: value
                    }
                )
            }
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
                data={cities}
                handleChange={handleChange} 
                formData={formData}
                />
                
                <div className="decorativeLine-thin"/>
                <button className="filterEvents-btnPrikazhi button">Прикажи</button>
            </form>
        </div>
    )
}


