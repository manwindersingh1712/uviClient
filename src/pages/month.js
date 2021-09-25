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
import leftCorner from "../assets/images/homepage/l-corner.png";
import rightCorner from "../assets/images/homepage/r-corner.png";

const MonthView = () => {
  const [source, setSource] = useState([]);

  useEffect(() => {
    retrieveTasks();
  }, []);

  const retrieveTasks = async () => {
    const allTasks = await getTasks();
    const source = allTasks.map((task) => {
      return !task.completed
        ? {
            StartTime: new Date(moment(task.dateAndTime)),
            EndTime: new Date(moment(task.dateAndTime).add("hour", 0.5)),
            Subject: task.appointmentName,
          }
        : {};
    });
    setSource(source);
  };

  return (
    <div
      className="bg-white flex flex-col items-center"
      style={{ height: "calc(100vh - 112px)" }}
    >
      <div className="montserrat grey-10 text-6xl font-semibold my-16">
        Monthly View
      </div>

      <div className="container mx-auto">
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
