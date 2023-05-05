import "./VenueDetails.css";
import UnderlinedLabel from "../../components/UnderlinedLabel/UnderlinedLabel"
import { useMemo } from "react";
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
const VenueDetails = () => {

  const containerStyle = {
    width: "100%",
    height: "100%"
  }
  
  const center = {
    lat: 41.02355896867285,
    lng: 21.33990962449036
  }

  return (
    <div className="venueDetails--pageContainer">
      <div className="venueDetails--headerBackground">
        <div className="venueDetails--headerContent">
          <h1 className="venueDetails--nameHeader">Расчекор</h1>
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
            <UnderlinedLabel label="Локација" value="Партизанска 21, Битола" />
          </div>
          <div className="venueDetails--info">
            <UnderlinedLabel label="Контакт број" value="070 123 456" />
          </div>
        </div>
        <div className="venueDetails--imageSlider"></div>
        <div className="venueDetails--additionalDetails">
          <div className="venueDetails-additionalinfo">
            <UnderlinedLabel label="Најди на карта" value="" />
            <div className="venueDetails-locationMap">
              <LoadScript googleMapsApiKey="AIzaSyDda3FCTD3PD3gMvrL12fYCMdbxp3UcxeM">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={17}
                >, 
                  <MarkerF position={{lat: 41.02341113959708, lng: 21.33991440364335}}/>
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
          <div className="venueDetails-additionalinfo">
            <UnderlinedLabel label="Оценки" value="" />
            <div className="venueDetails-reviews">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
