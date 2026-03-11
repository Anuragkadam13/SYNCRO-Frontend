import React from "react";
import TaskListNumbers from "../others/TaskListNumbers";
import TaskList from "../Tasklist/TaskList";

const EmployeeDashboard = (props) => {
  return (
    <div className="h-screen w-full p-5">
      <TaskListNumbers data={props.data} />
      <TaskList data={props.data} updateUserData={props.updateUserData} />
    </div>
  );
};

export default EmployeeDashboard;
