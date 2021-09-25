import React from "react";
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
import { useEffect, useState } from "react";
import { getTasks } from "../assets/utils/index";

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
            EndTime: new Date(moment(task.dateAndTime).add("hour", 1)),
            Subject: task.appointmentName,
          }
        : {};
    });
    setSource(source);
  };

  return (
    <div className="container mx-auto h-full">
      <ScheduleComponent
        currentView="Month"
        selectedDate={Date.now()}
        eventSettings={{ dataSource: source }}
        readOnly={true}
      >
        <Inject services={[Month, Day, WorkWeek, Week, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};

export default MonthView;
