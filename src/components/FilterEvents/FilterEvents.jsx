import React, { useState, useEffect } from "react";
import DatePickerElements from "../DatePicker/DatePicker";
import Heading from "../Heading/";
import CityDropdown from "../CityDropdown/CityDropdown.jsx";
import {getDateTimeDay} from "../../utils/utils.js"
import "./FilterEvents.css";
import axios from "axios";
import Dropdown from "../UI/DropDown/Dropdown";
// API DATA:
// {
//     "pageNumber": 0,
//     "itemsPerPage": 0,
//     "categoryId": 0,
//     "cityId": 0,
//     "startDate": "2023-04-14T20:56:19.759Z",
//     "endDate": "2023-04-14T20:56:19.759Z"
//   }

export default function FilterEvents({ setEvents, eventState }) {

  const [cities, setCities] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
    cityId: null,
    pageNumber: 1,
    itemsPerPage: 9,
    categoryId: null,
  });

  useEffect(() => {
    fetchCities();
    fetchCategories();
  }, []);

  // fetch cities to send to CityDropdown component
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

    // fetch categories to send to Dropdown component
  const fetchCategories = () => {
    axios
      .get("https://tajmautmk.azurewebsites.net/api/Categories/GetAllCategories")
      .then((response) => {
        const categories = response.data.map((category) => {
            return {
              value: category.categoryEventId,
              label: category.name,
            };
        })
        setEventCategories(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleSubmit(event) {
    event.preventDefault();
    setEvents(formData);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      if (value == "0") {
        return {
          ...prevFormData,
          [name]: null,
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  }
console.log(formData);
  return (
    <div className="filterEvents-container layout-border">
      <form onSubmit={handleSubmit}>
        <Heading label="Период на прикажување" />
        <DatePickerElements formData={formData} setFormData={setFormData} />
        <Heading label="Локација" />
        <CityDropdown
          data={cities}
          handleChange={handleChange}
          formData={formData}
        />
        <div className="filterEvents--eventCategory">
            <Heading label="Тип настан" />
            <Dropdown data={eventCategories} 
            handleChange={handleChange}
            name="categoryId"
            />
        </div>
        <div className="decorativeLine-thin" />
        <button className="filterEvents-btnPrikazhi button">Прикажи</button>
      </form>
    </div>
  );
}
