import React from "react";
import logo from "../../assets/images/logo.jpg";
import { withRouter } from "react-router-dom";

const Navbar = (props) => {
  const { history } = props;
  return (
    <div className="border-b-2 border-solid border-gray-300 h-28">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="w-14 md:w-24 py-4 cursor-pointer"
          onClick={() => {
            history.push("/");
          }}
        >
          <img src={logo} alt="uvi-health logo"></img>
        </div>
        <div>
          <button
            className="w-max bg-grey-10 text-white font-bold px-8 py-4 montserrat rounded-full hover:bg-red-400 mr-8"
            onClick={() => {
              history.push("/day_view");
            }}
          >
            Day
          </button>
          <button
            className="w-max bg-grey-10 text-white font-bold px-8 py-4 montserrat rounded-full hover:bg-red-400"
            onClick={() => {
              history.push("/month_view");
            }}
          >
            Month
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
