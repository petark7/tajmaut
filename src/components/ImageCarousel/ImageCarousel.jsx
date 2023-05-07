import React, { useEffect, useState } from "react";
import "./ImageCarousel.css";
import Carousel from "react-material-ui-carousel";

function Item(props)
{
    return (
       <>
        <img className="venueCarousel--venueImages" src={props.item.url}/>
       </>
    )
}
const ImageCarousel = ({galleryImages}) => {
const [images, setImages] = useState([
  {
    url: galleryImages.galleryImage1
  },

])

// map over received data and insert every url that is not null
useEffect(() => {
  {
    const newImages = Object.entries(galleryImages)
    .filter(([key, value]) => value !== "null")
    .map(([key, value]) => (
      {
        url: value
      }
    ))
    setImages(newImages);
  }
}, [])

  return (
    <>
      <div className="venueCarousel--mainContainer">
        <Carousel
        navButtonsAlwaysVisible
        navButtonsProps={{
            style: { borderRadius: "50%", width: "50px", height: "50px" },
          }}
        >   
          {images.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ImageCarousel;
