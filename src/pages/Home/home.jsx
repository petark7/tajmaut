import React, { useState } from "react";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import DaySlider from "../../components/DaySlider/DaySlide.jsx";
import "./home.css";

export default function Home() {
 
  return (
    <>
      <div className="home--backgroundImage">
        <HomeSlider numEvents="3"/>
      </div>
      <div className="home--daySlider-container">
         <DaySlider/>
      </div>
    </>
  );
}
