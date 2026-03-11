import React from "react";

const TaskListNumbers = ({ data }) => {
  return (
    <div className="flex justify-between gap-4 md:gap-4 flex-col md:flex-row ">
      <div className="flex rounded-lg w-full py-2 px-4 md:py-5 md:px-10 bg-blue-500 ">
        <h2 className="md:text-md lg:text-xl xl:text-2xl font-semibold">
          {data.taskCounts.newTask} New Task
        </h2>
      </div>
      <div className="flex rounded-lg w-full  py-2 px-4 md:py-5 md:px-10 bg-yellow-500 ">
        <h2 className="md:text-md lg:text-xl xl:text-2xl font-semibold">
          {data.taskCounts.active} Accepted Task
        </h2>
      </div>
      <div className="flex rounded-lg w-full py-2 px-4 md:py-5 md:px-10 bg-green-500 ">
        <h2 className="md:text-md lg:text-xl xl:text-2xl font-semibold">
          {data.taskCounts.completed} Completed Task
        </h2>
      </div>
      <div className="flex rounded-lg w-full py-2 px-4 md:py-5 md:px-10 bg-red-600 ">
        <h2 className="md:text-md lg:text-xl xl:text-2xl font-semibold">
          {data.taskCounts.failed} Failed Task
        </h2>
      </div>
    </div>
  );
};

export default TaskListNumbers;
