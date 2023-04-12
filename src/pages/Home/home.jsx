import React, { useState } from "react";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import CardSlider from "../../components/CardSlider/CardSlider.jsx";
import "./home.css";

export default function Home() {
 
  return (
    <>
      <div className="home--backgroundImage">
        <HomeSlider numEvents="5"/>
      </div>
      <div className="home--daySlider-container">
         <CardSlider day="nextDay"/>
      </div>
    </>
  );
}
