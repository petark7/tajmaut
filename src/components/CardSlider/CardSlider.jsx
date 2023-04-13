import "./CardSlider.css"
import Slider from "react-slick";


export default function CardSlider (props) {

    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 3.99,
        slidesToScroll: 1,
        draggable: false,
        prevArrow: <div className="slick-prev-days"></div>,
        nextArrow: <div className="slick-next-days"></div>,
      };

    return (
        <div className="cardslider-container">
          <div className="cardslider--day">{props.title}</div>
          <div className="cardslider--cardsContainer">
            <div className="">
              <Slider
                {...settings}
                style={{
                  width: "1150px",
                  maxWidth: "100%",
                  height: "100%"
                }}
              >
                {props?.data}
              </Slider>
     
            </div>
          </div>
        </div>
      );
}