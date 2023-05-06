import "./VenueDetails.css";
import UnderlinedLabel from "../../components/UnderlinedLabel/UnderlinedLabel";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import VenueReviews from "../../components/VenueReviews/VenueReviews";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import ErrorPage from "../../pages/error-page"
const VenueDetails = () => {
  const { venueID } = useParams();
  const [venueDetails, setVenueDetails] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "7px",
    border: "1px #d3d3d3 solid"
  };

  const center = {
    lat: 41.02355896867285,
    lng: 21.33990962449036,
  };

  useEffect(() => {
    // Make an API call to check if the venue ID exists
    axios.get(`https://tajmautmk.azurewebsites.net/api/Venues/GetVenueByID?VenueId=${venueID}`)
      .then(response => {
        setVenueDetails(response.data);
      })
      .catch(error => {
        setVenueDetails(false);
      });
  }, [venueID]);

  if (venueDetails === null) {
    return <h1>Се вчитува...</h1>
  }
  if (!venueDetails) {
    return <ErrorPage/>;
  }

  return (
    <div className="venueDetails--pageContainer">
      <div className="venueDetails--headerBackground">
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
              value="Пет-Саб 00:00 - 04:00"
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
          <ImageCarousel />
        </div>
        <div className="venueDetails--additionalDetails">
          <div className="venueDetails-additionalinfo">
            <UnderlinedLabel label="Најди на карта" value="" />
            <div className="venueDetails-locationMap">
              <LoadScript googleMapsApiKey="AIzaSyDda3FCTD3PD3gMvrL12fYCMdbxp3UcxeM">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={17}
                >
                  ,
                  <MarkerF
                    position={{
                      lat: 41.02341113959708,
                      lng: 21.33991440364335,
                    }}
                  />
                </GoogleMap>
              </LoadScript>
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
