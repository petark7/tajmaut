import "./VenueDetails.css";
import UnderlinedLabel from "../../components/UnderlinedLabel/UnderlinedLabel";
import { GoogleMap, LoadScript, useLoadScript , MarkerF } from "@react-google-maps/api";
import VenueReviews from "../../components/VenueReviews/VenueReviews";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import ErrorPage from "../../pages/error-page"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const VenueDetails = () => {
  
  const { venueID } = useParams();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:"AIzaSyDda3FCTD3PD3gMvrL12fYCMdbxp3UcxeM",
  });

  const [venueDetails, setVenueDetails] = useState(null);
  const [mapLocation, setMapLocation] = useState({
    "lat": 41.02401325016641,
    "lng": 21.336643837311875
  })

  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "7px",
    border: "1px #d3d3d3 solid"
  };

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])
  
  useEffect(() => {
    // Make an API call to check if the venue ID exists
    axios.get(`https://tajmaut.azurewebsites.net/api/Venues/GetVenueByID?VenueId=${venueID}`)
      .then(response => {
        setVenueDetails(response.data);
        setMapLocation(response.data.location)
      })
      .catch(error => {
        setVenueDetails(false);
      });

  }, [venueID]);

  if (venueDetails === null) {
    return <>
    <div className="center">
      <LoadingSpinner/>
    </div>
    </>
  }
  if (!venueDetails) {
    return <>
    <div className="center">
      <ErrorPage/>
    </div>
    </>
  }

  const beforeStyle = {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${venueDetails.venueImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'brightness(0.5)',
    opacity: 0.8,
    zIndex: -1,
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";
  
  return (
    <div className="venueDetails--pageContainer">
      <div className="venueDetails--headerBackground">
      <div style={beforeStyle}></div>
        <div className="venueDetails--headerContent">
          <h1 className="venueDetails--nameHeader">{venueDetails?.name}</h1>
          {/* <button className="eventDetails-reserveBtn venueDetails--reserveBtn">
          Резервации
        </button> */}
        </div>
      </div>
      <div className="venueDetails--pageContent">
        <div className="venueDetails--information">
          <div className="venueDetails--info">
            <UnderlinedLabel
              label="Работно Време"
              value={venueDetails.workingHours}
            />
          </div>
          <div className="venueDetails--info">
            <UnderlinedLabel label="Локација" value={venueDetails.address} />
          </div>
          <div className="venueDetails--info">
            <UnderlinedLabel label="Контакт број" value={venueDetails.phone} />
          </div>
        </div>
        <div className="venueDetails--imageSlider">
          <ImageCarousel galleryImages={venueDetails.galleryImages}/>
        </div>
        <div className="venueDetails--additionalDetails">
          <div className="venueDetails-additionalinfo">
            <UnderlinedLabel label="Најди на карта" value="" />
            <div className="venueDetails-locationMap">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={mapLocation}
                  zoom={17}
                  onError={(error)=> {console.log(error)}}
                >
                  ,
                  <MarkerF
                    position={mapLocation}
                  />
                </GoogleMap>
            </div>
          </div>
          <div className="venueDetails-additionalinfo">
            <UnderlinedLabel label="Оценки" value="" />
            <div className="venueDetails-reviews">
              <VenueReviews />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
