import React, { Component } from "react";
import Slider from "react-slick";
import "./HomeSlider.css";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slider">
            <div className="slider--content">
              <img
                className="sliderImg"
                src={require("../../img/event_01.jpg")}
              ></img>

              <div className="slider-content">
                <h1 className="slider--eventTitle">DJ IRIE SCRATCH FIRST</h1>
                <h2 className="sliderh2">20/01/2023 Битола - Расчекор</h2>
                <h2 className="sliderh2">18:00</h2>
                <div className="buttonContainer">
                  <button className="homeSlider-reserveBtn">Резервирај</button>
                </div>
              </div>
            </div>
          </div>

          <div className="slider">
            <div className="slider--content">
              <img
                className="sliderImg"
                src={require("../../img/event_01.jpg")}
              ></img>

              <div className="slider-content">
                <h1 className="slider--eventTitle">DJ IRIE SCRATCH SECOND</h1>
                <h2 className="sliderh2">20/01/2023 Битола - Расчекор</h2>
                <h2 className="sliderh2">18:00</h2>
                <div className="buttonContainer">
                  <button className="homeSlider-reserveBtn">Резервирај</button>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
