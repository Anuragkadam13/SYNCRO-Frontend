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
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const AllTask = ({ employees }) => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const taskRes = await api.get("/tasks/all-completed");
        setCompletedTasks(taskRes.data);
      } catch (err) {
        toast.error("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const SubmissionSkeleton = () => (
    <div className="p-4 rounded-lg border-l-4 border bg-card/50">
      <div className="flex justify-between mb-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-4 w-1/3 mb-4" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
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
        {loading ? (
          // 4. Show 4 skeletons while loading
          [1, 2, 3, 4].map((i) => <SubmissionSkeleton key={i} />)
        ) : completedTasks.length > 0 ? (
          completedTasks.map((task, idx) => (
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
          ))
        ) : (
          <div className="col-span-full py-10 flex flex-col items-center justify-center border-2 border-dashed rounded-xl opacity-60">
            <img
              src="/SYNCRO.png"
              alt="No Submissions"
              className="w-16 h-16 grayscale mb-3"
            />
            <p className="text-lg font-medium text-gray-500 uppercase tracking-widest text-center">
              No submissions from the employees yet...
            </p>
            <p className="text-xs text-gray-400 italic text-center">
              When employees finish tasks, their proof will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTask;
