import React, { useState } from "react";
import SimpleSlider from "../../components/HomeSlider/HomeSlider.jsx";
import DaySlider from "../../components/DaySlider/DaySlide.jsx";
import "./home.css";

export default function Home() {
 
  return (
    <>
      <div className="introduction">
        <SimpleSlider />

        <DaySlider />
      </div>
    </>
  );
}
