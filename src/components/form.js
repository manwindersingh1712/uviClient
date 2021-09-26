import React from "react";
import { useEffect, useRef, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import cogoToast from "cogo-toast";
import Axios from "axios";

import { AppointmentType, ENV_VARS, AXIOS_CONFIG } from "../assets/utils/enums";

const { BASE_API } = ENV_VARS;
const { FITNESS, NUTRITION, DOCTOR } = AppointmentType;

const Form = () => {
  const [appointmentName, setAppointmentName] = useState("");
  const [name, setName] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!appointmentName || !name || !appointmentType || !time || !date) {
      cogoToast.warn("Please enter all the fields!!");
      return;
    }

    try {
      const responseData = await Axios.post(
        `${BASE_API}/task/add`,
        {
          appointmentName,
          personName: name,
          appointmentType,
          date,
          time,
        },
        AXIOS_CONFIG
      );
      setAppointmentName("");
      setName("");
      setAppointmentType("");
      setDate(new Date());
      setTime(new Date(0, 0, 0, 12, 0));
      formRef.current.focus();
      cogoToast.info(responseData.data.message);
    } catch (err) {
      console.log(err);
      cogoToast.error("Please retry, Server error");
    }
  };

  useEffect(() => {
    formRef.current.focus();
  }, []);

  return (
    <div>
      <div className="montserrat grey-10 text-3xl md:text-6xl font-semibold text-center md:text-left mb-5">
        Create a task
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center md:items-start "
      >
        <label htmlFor="appointmentName">
          <i className="far fa-calendar-check mr-3"></i>
          <input
            id="appointmentName"
            ref={formRef}
            type="text"
            name="appintmentname"
            placeholder="Appintment Name"
            className="p-3 pl-0 text-lg bg-transparent border-b-3 border-transparent mx-2 md:w-400 transition focus:outline-none"
            value={appointmentName}
            onChange={(e) => setAppointmentName(e.target.value)}
          ></input>
        </label>
        <label htmlFor="name">
          <i className="fas fa-user mr-3"></i>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your Name"
            className="p-3 pl-0 text-lg bg-transparent border-b-3 border-transparent mx-2 md:w-400 transition focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </label>
        <label>
          <i className="fas fa-quote-left mr-3"></i>
          <select
            className={`p-3 pl-0 text-lg bg-transparent border-b-3 border-transparent mx-2 md:w-400 transition focus:outline-none ${
              appointmentType === "" && "text-gray-400"
            }`}
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value)}
          >
            <option value="" disabled hidden>
              Appointment Type
            </option>
            <option value={FITNESS}>Fitness Coach Appointment</option>
            <option value={NUTRITION}>Nutrition Coach Appointment</option>
            <option value={DOCTOR}>Doctor Appointment</option>
          </select>
        </label>
        <div className="flex flex-col p-3 pl-0 text-lg bg-transparent border-b-3 border-transparent mx-2 md:w-400 transition focus:outline-none">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yy"
              margin="normal"
              id="date-picker"
              value={date}
              onChange={(e) => {
                setDate(e);
              }}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              color="primary"
              value={time}
              onChange={(e) => {
                setTime(e);
              }}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <button
          className="w-max bg-grey-10 text-white font-bold px-8 py-4 montserrat rounded-full hover:bg-red-400"
          type="submit"
        >
          Add a task
        </button>
      </form>
    </div>
  );
};

export default Form;
