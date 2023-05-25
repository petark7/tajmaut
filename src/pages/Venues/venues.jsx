import CardList from "../../components/CardList/CardList";
import VenueCard from "../../components/VenueCard/VenueCard";
import FilterEvents from "../../components/FilterEvents/FilterEvents";
import FilterVenues from "../../components/FilterVenues/FilterVenues";
import "./venues.css"
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { ScrollRestoration } from 'react-router-dom';

export default function Venues() {
  const [venueData, setVenueData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState(
    {
      pageNumber: 1,
      itemsPerPage: 9,
      cityId: null,
      venueTypeId: null,
    },
  ); 
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    getVenueData();
  }, [settings])

  const getVenueData = () => {
    setIsLoading(true);
    axios.post('https://tajmautmk.azurewebsites.net/api/Venues/FilterVenues', settings)
    .then(response => {
      setIsLoading(false)
      setVenueData(response.data)
      const cards = response.data.items.map(venues => {
        return (
          {
            venueId: venues.venueId,
            venueImage: venues.venueImage,
            venueType: venues.venueType.name,
            venueName: venues.name,
            venueCity: venues.venueCity.cityName,
            venueAddress: venues.address,
          }
        )
      })
      setCardData(cards);
      setTotalItems(response.data.totalItems)
    })
    .catch(error => {
      setIsLoading(false);
      console.log(error.response.data)
      setCardData([]);
    })
  }

  console.log(isLoading)
  return (
    <div className="venues--mainContainer">
      <ScrollRestoration/>
        <div className="venues--contentContainer">
          <div className="venues--filterEvents layout-border--venues">
            <FilterVenues setSettings={setSettings}/>
          </div>
          <div className="venues--venueList layout-border">
            {isLoading ? 
            <div className="venues--loadingSpinner">
              <LoadingSpinner/>
              </div> : 
              <CardList 
            card={VenueCard} 
            data={cardData} 
            loading = {isLoading}
            settings={settings} 
            setSettings= {setSettings}
            totalItems = {totalItems}/>}
          </div>
        </div>
    </div>
  );
}

// data.venueImage
// data.venueType
// data.venueName
// data.venueCity
// data.venueAddress