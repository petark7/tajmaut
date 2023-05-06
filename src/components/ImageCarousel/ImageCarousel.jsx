import React from "react";
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
const ImageCarousel = (props) => {

  var items = [
    {
      url: "https://i0.wp.com/bitolanews.mk/wp-content/uploads/2021/11/rasscekor-8.jpg?resize=800%2C534&ssl=1",
    },
    {
      url: "https://nezavisen.mk/wp-content/uploads/2021/11/image10.jpeg",
    },
    {
      url: "https://i0.wp.com/bitolanews.mk/wp-content/uploads/2021/11/sopen-13.jpg?resize=800%2C477&ssl=1",
    },
    {
      url: "https://www.popularno.mk/wp-content/uploads/2021/11/261183716_434608928110906_8187942504195908575_n.jpg",
    },
  ];

  return (
    <>
      <div className="venueCarousel--mainContainer">
        <Carousel
        navButtonsAlwaysVisible
        navButtonsProps={{
            style: { borderRadius: "50%", width: "50px", height: "50px" },
          }}
        >   
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ImageCarousel;
