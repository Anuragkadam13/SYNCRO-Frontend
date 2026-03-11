import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { GoPaperclip } from "react-icons/go";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AllTask = ({ employees }) => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskRes = await api.get("/tasks/all-completed");
        setCompletedTasks(taskRes.data);
      } catch (err) {
        toast.error("Failed to fetch employees");
      }
    };
    fetchTasks();
  }, []);
  return (
    <div className="mt-5  rounded-xl shadow-md  px-6 py-8 border">
      <h1 className="text-2xl font-semibold mb-2 flex items-center">
        Employees Status
      </h1>
      <div className="overflow-x-auto">
        <Table className="min-w-full border rounded-md">
          <TableHeader className=" text-left">
            <TableRow>
              <TableHead>Employee Name</TableHead>
              <TableHead>New Task</TableHead>
              <TableHead>Active Task</TableHead>
              <TableHead>Completed Task</TableHead>
              <TableHead>Failed Task</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((elem, id) => (
              <TableRow key={id}>
                <TableCell>{elem.firstName}</TableCell>
                <TableCell>{elem.taskCounts?.newTask}</TableCell>
                <TableCell>{elem.taskCounts?.active}</TableCell>
                <TableCell>{elem.taskCounts?.completed}</TableCell>
                <TableCell>{elem.taskCounts?.failed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Proof Submission List */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">Recent Submissions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {completedTasks.map((task, idx) => (
          <div key={idx} className="p-4 rounded-lg border-l-4 border ">
            <div className="flex justify-between">
              <h3 className="font-bold">{task.taskTitle}</h3>
              <span className="text-xs text-gray-500">{task.category}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Completed by: {task.assignedTo?.firstName}
            </p>

            {task.proofFile && (
              <a
                href={`https://syncro-backend-gamma.vercel.app/api/tasks/view-proof/${task._id}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center text-blue-500 underline text-sm hover:text-blue-400"
              >
                View Proof Attachment
                <GoPaperclip className="ml-0.5" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;
