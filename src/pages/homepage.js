import React from "react";
import MyCarousel from "../components/carousel";
import Form from "../components/form";

const HomePage = () => {
  return (
    <div>
      <div className="container flex flex-col justify-around md:flex-row mt-20 mx-auto">
        <div className="relative z-10 w-4/4">
          <Form />
        </div>
        <div className="relative z-10 w-4/5 md:w-1/3">
          <MyCarousel />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 left-0 z-0 opacity-40">
        <svg
          height="100%"
          width="100%"
          id="svg"
          viewBox="0 0 1440 500"
          xmlns="http://www.w3.org/2000/svg"
          class="transition duration-300 ease-in-out delay-150"
        >
          <path
            d="M 0,500 C 0,500 0,250 0,250 C 169.06666666666666,275.4666666666667 338.1333333333333,300.93333333333334 485,283 C 631.8666666666667,265.06666666666666 756.5333333333333,203.73333333333335 912,191 C 1067.4666666666667,178.26666666666665 1253.7333333333333,214.13333333333333 1440,250 C 1440,250 1440,500 1440,500 Z"
            stroke="none"
            stroke-width="0"
            fill="#ff6900ff"
            class="transition-all duration-300 ease-in-out delay-150"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HomePage;
