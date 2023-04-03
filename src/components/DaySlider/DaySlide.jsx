import { Component } from "react";
import Slider from "react-slick";
import "./DaySlider.css";

export default class DaySlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 4,
      slidesToScroll: 4,
    };
    return (
      <>
        <div className="dayslider-container">
          <div className="header">
            <h1>Петок</h1>
          </div>

          <div className="dayslider-content">
            <Slider {...settings}>
              <div className="days-slider">
                <h3> 1</h3>
              </div>
              <div className="days-slider">
                <h3>2</h3>
              </div>
              <div className="days-slider">
                <h3>3</h3>
              </div>
              <div className="days-slider">
                <h3>4</h3>
              </div>
              <div className="days-slider">
                <h3>5</h3>
              </div>
              <div className="days-slider">
                <h3>6</h3>
              </div>
            </Slider>
            <button className="day-btn">Прикажи ги сите</button>
          </div>
        </div>
      </>
    );
  }
}
