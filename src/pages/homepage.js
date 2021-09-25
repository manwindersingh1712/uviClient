import React from "react";
import MyCarousel from "../components/carousle";
import Form from "../components/form";
import rightCorner from "../assets/images/homepage/r-corner.png";

const HomePage = () => {
  return (
    <div className="md:container md:mx-auto flex flex-col justify-around md:flex-row mt-20">
      <div className="w-4/4">
        <Form />
      </div>
      <div className="w-4/5 md:w-1/3">
        <MyCarousel />
      </div>
      <div className="hidden md:block absolute bottom-0 right-0">
        <img src={rightCorner} alt="right corner" />
      </div>
    </div>
  );
};

export default HomePage;
