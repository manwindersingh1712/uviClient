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

const Form = () => {
  const [appointmentName, setAppointmentName] = useState("");
  const [name, setName] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!appointmentName || !name || !appointmentType || !time || !date) {
      cogoToast.warn("Please enter all the fields!!");
      return;
    }

    Axios.post("http://localhost:4000/task/add", {
      appointmentName,
      personName: name,
      appointmentType,
      date,
      time,
    })
      .then((res) => {
        setAppointmentName("");
        setName("");
        setAppointmentType("");
        setDate(new Date());
        setTime(new Date(0, 0, 0, 12, 0));
        formRef.current.focus();
        cogoToast.info("Task Added Successfully!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    formRef.current.focus();
  }, []);

  return (
    <div>
      <div className="montserrat grey-10 text-6xl font-semibold">
        Create a task
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="appointmentName">
          <i className="far fa-calendar-check mr-3"></i>
          <input
            id="appointmentName"
            ref={formRef}
            type="text"
            name="appintmentname"
            placeholder="Appintment Name"
            className="input-task focus:outline-none"
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
            className="input-task focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </label>
        <label>
          <i className="fas fa-quote-left mr-3"></i>
          <select
            className={`input-task focus:outline-none ${
              appointmentType === "" && "text-gray-400"
            }`}
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value)}
          >
            <option value="" disabled hidden>
              Appointment Type
            </option>
            <option value="Fitness">Fitness Coach Appointment</option>
            <option value="Nutrition">Nutrition Coach Appointment</option>
            <option value="Doctor">Doctor Appointment</option>
          </select>
        </label>
        <div className="flex flex-col input-task">
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
