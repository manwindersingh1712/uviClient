import React from "react";
import { useEffect, useState } from "react";

import {
  ScheduleComponent,
  Inject,
  Day,
  WorkWeek,
  Week,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import moment from "moment";

import { getTasks } from "../assets/utils/index";
import { AppointmentType } from "../assets/utils/enums";
import leftCorner from "../assets/images/homepage/l-corner.png";
import rightCorner from "../assets/images/homepage/r-corner.png";
import cogoToast from "cogo-toast";

const { ALL, FITNESS, NUTRITION, DOCTOR } = AppointmentType;

const MonthView = () => {
  const [source, setSource] = useState([]);
  const [appointmentType, setAppointmentType] = useState(ALL);

  useEffect(() => {
    retrieveTasks();
  }, [appointmentType]);

  const retrieveTasks = async () => {
    const allTasks = await getTasks();
    if (!allTasks) {
      cogoToast.error("Server error, please refresh");
      return;
    }
    const source = allTasks.map((task) => {
      const isDataSourceAllowed =
        appointmentType === ALL
          ? !task.completed
          : !task.completed && task.appointmentType === appointmentType;

      return isDataSourceAllowed
        ? {
            StartTime: new Date(moment(task.dateAndTime)),
            EndTime: new Date(moment(task.dateAndTime)),
            Subject: `${task.appointmentName}(${task.appointmentType})`,
          }
        : {};
    });
    setSource(source);
  };

  return (
    <div
      className="bg-white flex flex-col items-center py-8 md:py-16 px-10 md:px-0"
      style={{ minHeight: "calc(100vh - 112px)" }}
    >
      <div className="montserrat grey-10 text-3xl md:text-6xl font-semibold text-center">
        Monthly View
      </div>

      <div className="container flex justify-end items-center my-5">
        <label className="mr-4 hidden md:block" htmlFor="type">
          Filter :
        </label>
        <select
          id="type"
          className="p-3 pl-0 text-lg bg-transparent border-b-3 border-transparent mx-2 w-max transition focus:outline-none"
          value={appointmentType}
          onChange={(e) => setAppointmentType(e.target.value)}
        >
          <option value={ALL}>All</option>
          <option value={FITNESS}>Fitness Coach Appointment</option>
          <option value={NUTRITION}>Nutrition Coach Appointment</option>
          <option value={DOCTOR}>Doctor Appointment</option>
        </select>
      </div>

      <div className="relative z-10 container mx-auto montserrat">
        <ScheduleComponent
          currentView="Month"
          selectedDate={Date.now()}
          eventSettings={{ dataSource: source }}
          readOnly={true}
        >
          <Inject services={[Month, Day, WorkWeek, Week, Agenda]} />
        </ScheduleComponent>
      </div>
      <div className="hidden md:block absolute -left-4" style={{ top: "60%" }}>
        <img src={leftCorner} alt="left corner" />
      </div>
      <div className="hidden md:block absolute right-0 bottom-0">
        <img src={rightCorner} alt="right corner" />
      </div>
    </div>
  );
};

export default MonthView;
