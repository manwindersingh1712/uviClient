import React from "react";
import "react-table-v6/react-table.css";
import ReactTable from "react-table-v6";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import moment from "moment";
import { getTasks } from "../assets/utils/index";

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
          {props.value ? "Completed" : "Pending"}
        </div>
      ),
    },
    {
      Header: "Complete trigger",
      accessor: "_id",
      headerClassName: "font-black montserrat",
      className: "table-column montserrat",

      Cell: (props) => (
        <button
          className="w-max bg-grey-10 text-xs text-white font-bold px-6 py-2 montserrat rounded-md hover:bg-red-400"
          onClick={() => {
            completeAppointment(props.value);
          }}
        >
          Complete the class
        </button>
      ),
    },
  ]);

  const completeAppointment = async (id) => {
    try {
      const responseData = await axios.put(
        `http://localhost:4000/task/complete/${id}`
      );
      retrieveData();
    } catch (err) {
      console.log(err);
    }
  };

  const retrieveData = async () => {
    let data = await getTasks();
    data = data.filter((task) => {
      return (
        moment(task.dateAndTime).format("MM-DD-YYYY") ===
        moment().format("MM-DD-YYYY")
      );
    });
    setTasks(data);
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div className="container mx-auto">
      {tasks && (
        <div className="bg-white">
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
  );
};

export default DayView;
