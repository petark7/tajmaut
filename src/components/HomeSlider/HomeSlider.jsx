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
      <div>
        <Slider {...settings}>
          <div>
            <div className="slider">
              <div className="slider-img1"></div>

              <div className="slider-content">
                <h1 className="sliderh1">DJ IRIE SCRATCH</h1>
                <h2 className="sliderh2">20/01/2023 Битола - Расчекор</h2>
                <div className="buttonContainer">
                  <button className="homeSlider-reserveBtn">
                    Резервирај
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="slider">
              <div className="slider-img2"></div>

              <div className="slider-content">
                <h1 className="sliderh1">DJ IRIE SCRATCH</h1>
                <h2 className="sliderh2">20/01/2023 Битола - Расчекор</h2>
                <div className="buttonContainer">
                  <button className="homeSlider-reserveBtn">
                    Резервирај
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="slider">
              <div className="slider-img3"></div>

              <div className="slider-content">
                <h1 className="sliderh1">DJ IRIE SCRATCH</h1>
                <h2 className="sliderh2">20/01/2023 Битола - Расчекор</h2>
                <div className="buttonContainer">
                  <button className="homeSlider-reserveBtn">
                    Резервирај
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="slider">
              <div className="slider-img4"></div>

              <div className="slider-content">
                <h1 className="sliderh1">DJ IRIE SCRATCH</h1>
                <h2 className="sliderh2">20/01/2023 Битола - Расчекор</h2>
                <div className="buttonContainer">
                  <button className="homeSlider-reserveBtn">
                    Резервирај
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
