import axios from "axios";
import Heading from "../Heading";
import Dropdown from "../UI/DropDown/Dropdown";
import "./FilterVenues.css";
import { useEffect, useState } from "react";

const FilterVenues = ({ setSettings }) => {
  const [cities, setCities] = useState([]);
  const [venueCategories, setVenueCategories] = useState([]);

  const [formData, setFormData] = useState({
    cityId: null,
    pageNumber: 1,
    itemsPerPage: 9,
    venueCategoryId: null,
  });

  useEffect(() => {
    fetchCities();
    fetchCategories();
  }, []);

  const fetchCities = () => {
    axios
      .get(`https://tajmautmk.azurewebsites.net/api/Venues/GetAllVenueCities`)
      .then((response) => {
        const formattedCities = response.data.map((city) => {
          return {
            value: city.venue_CityId,
            label: city.cityName,
          };
        });
        setCities(formattedCities);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCategories = () => {
    axios
      .get(`https://tajmautmk.azurewebsites.net/api/Venues/GetAllVenueTypes`)
      .then((response) => {
        const formattedCategories = response.data.map((category) => {
          return {
            value: category.venue_TypesId,
            label: category.name,
          };
        });
        setVenueCategories(formattedCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings(formData);
  };
  console.log(formData);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Heading label="Локација" />
        <Dropdown data={cities} handleChange={handleChange} name="cityId" />
        <div className="filterVenues--venueCategory">
          <Heading label="Тип локал" />
        </div>
        <Dropdown
          data={venueCategories}
          handleChange={handleChange}
          name="venueTypeId"
        />
        <div className="decorativeLine-thin" />
        <button className="filterEvents-btnPrikazhi button">Прикажи</button>
      </form>
    </>
  );
};

export default FilterVenues;
