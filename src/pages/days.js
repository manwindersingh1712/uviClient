import React from "react";
import { useEffect, useMemo, useState } from "react";

import axios from "axios";
import ReactTable from "react-table-v6";
import moment from "moment";
import "react-table-v6/react-table.css";

import { getTasks } from "../assets/utils/index";
import leftCorner from "../assets/images/homepage/l-corner.png";
import rightCorner from "../assets/images/homepage/r-corner.png";
import { AppointmentStatus, ENV_VARS } from "../assets/utils/enums";
import cogoToast from "cogo-toast";

const { API } = ENV_VARS;
const { COMPLETE, PENDING } = AppointmentStatus;

const DayView = () => {
  const [tasks, setTasks] = useState([]);

  const columns = useMemo(() => [
    {
      Header: "S.No.",
      headerClassName: "font-black montserrat",
      accessor: "",
      key: "sno",
      width: 100,
      className: "table-column montserrat",
      Cell: (props) => {
        return props.index + 1;
      },
    },
    {
      Header: "Appointment Name",
      headerClassName: "font-black montserrat",
      accessor: "appointmentName",
      className: "table-column montserrat montserrat",
    },
    {
      Header: "Person Name",
      headerClassName: "font-black montserrat",
      accessor: "personName",
      className: "table-column montserrat",
    },
    {
      Header: "Appointment Type",
      headerClassName: "font-black montserrat",
      accessor: "appointmentType",
      className: "table-column montserrat",
    },
    {
      Header: "Date",
      accessor: "dateAndTime",
      headerClassName: "font-black montserrat",
      className: "table-column montserrat",
      Cell: (props) => {
        return <div>{moment(props.value).format("MM-DD-YYYY")}</div>;
      },
    },
    {
      Header: "Time",
      headerClassName: "font-black montserrat",
      accessor: "dateAndTime",
      className: "table-column montserrat",
      Cell: (props) => <div>{moment(props.value).format("hh:mm a")}</div>,
    },
    {
      Header: "Status",
      accessor: "completed",
      headerClassName: "font-black montserrat",
      className: "table-column montserrat",
      Cell: (props) => (
        <div>
          {props.value ? (
            <i className="fas fa-check-circle text-green-700 mr-2"></i>
          ) : (
            <i className="fas fa-times-circle text-red-600 mr-2"></i>
          )}
          {props.value ? COMPLETE : PENDING}
        </div>
      ),
    },
    {
      Header: "Complete trigger",
      accessor: "_id",
      headerClassName: "font-black montserrat",
      className: "table-column montserrat",

      Cell: (props) => {
        const appointmentStatus = props.original.completed;
        return (
          !appointmentStatus && (
            <button
              className="w-max bg-grey-10 text-xs text-white font-bold px-6 py-2 montserrat rounded-md hover:bg-red-400"
              onClick={() => {
                completeAppointment(props.value);
              }}
            >
              Click !
            </button>
          )
        );
      },
    },
  ]);

  const completeAppointment = async (id) => {
    try {
      const responseData = await axios.put(`${API}/task/complete/${id}`);
      cogoToast.info(responseData.data.message);
      retrieveData();
    } catch (err) {
      console.log(err);
    }
  };

  const retrieveData = async () => {
    let allTasks = await getTasks();
    if (!allTasks) {
      cogoToast.error("Server error, please refresh");
      return;
    }
    allTasks = allTasks.filter((task) => {
      return (
        moment(task.dateAndTime).format("MM-DD-YYYY") ===
        moment().format("MM-DD-YYYY")
      );
    });
    setTasks(allTasks);
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div
      className="bg-white flex flex-col items-center py-8 md:py-0"
      style={{ minHeight: "calc(100vh - 112px)" }}
    >
      <div className="montserrat grey-10 text-3xl md:text-6xl font-semibold mb-14 text-center mt-10">
        Today's Appointment Details
      </div>

      <div className="container mx-auto relative z-10">
        {tasks && (
          <div className="bg-white h-full">
            <ReactTable
              data={tasks}
              columns={columns}
              filterable
              showPagination={true}
              defaultPageSize={10}
              resizable={false}
            />
          </div>
        )}
        {!tasks && <div>Loading........ </div>}
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

export default DayView;
