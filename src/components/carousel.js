import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import fitness from "../assets/images/homepage/fitness.png";
import nutrition from "../assets/images/homepage/nutrition.png";
import doctor from "../assets/images/homepage/doctor.png";

const MyCarousel = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval="2000"
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      showIndicators={false}
      autoFocus={true}
    >
      <div className="border-red-300 border-4 border-solid rounded-2xl w-44 md:w-96">
        <img src={fitness} alt="fitness" className="rounded-xl"></img>
      </div>
      <div className="border-red-300 border-4 border-solid rounded-2xl w-44 md:w-96">
        <img src={nutrition} alt="nutrition" className="rounded-xl"></img>
      </div>
      <div className="border-red-300 border-4 border-solid rounded-2xl w-44 md:w-96">
        <img src={doctor} alt="doctor" className="rounded-xl"></img>
      </div>
    </Carousel>
  );
};

export default MyCarousel;
