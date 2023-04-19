import "./VenueDetails.css";
import UnderlinedLabel from "../../components/UnderlinedLabel/UnderlinedLabel"

const VenueDetails = () => {
  return (
    <div className="venueDetails--pageContainer">
      <div className="venueDetails--headerBackground">
        <div className="venueDetails--headerContent">
        <h1 className="venueDetails--nameHeader">Расчекор</h1>
        <button className="eventDetails-reserveBtn venueDetails--reserveBtn">
          Резервации
        </button>
        </div>
      </div>
      <div className="venueDetails--pageContent">
        <div className="venueDetails--information">
          <div className="venueDetails--info">
          <UnderlinedLabel label="Работно Време" value="Пет-Саб 00:00 - 04:00"/>
          </div>
          <div className="venueDetails--info">
          <UnderlinedLabel label="Локација" value="Партизанска 21, Битола"/>
          </div>
          <div className="venueDetails--info">
          <UnderlinedLabel label="Контакт број" value="070 123 456"/>
          </div>
        </div>
        <div className="venueDetails--imageSlider">
            
        </div>
        <div className="venueDetails--additionalDetails">
            <div className="venueDetails-additionalinfo">
            <UnderlinedLabel label="Најди на карта" value=""/>
            </div>
            <div className="venueDetails-additionalinfo">
            <UnderlinedLabel label="Оценки" value=""/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
