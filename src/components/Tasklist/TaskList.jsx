import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import SubmitProofModal from "../others/SubmitProofModal";
import { FaArrowTurnDown } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import img from "../../assets/NoTaskImg.png";

const TaskList = ({ data, updateUserData }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // Track which task is being completed
  const [showModal, setShowModal] = useState(false);

  const fetchMyTasks = async () => {
    const userId = data?._id || data?.id;

    if (!userId) return;
    try {
      const response = await api.get(`/tasks/my-tasks/${userId}`);
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks");
    }
  };

  useEffect(() => {
    if (data) {
      fetchMyTasks();
    }
  }, [data]);

  const handleAccept = async (id) => {
    try {
      await api.patch(`/tasks/accept/${id}`);
      fetchMyTasks();
      updateUserData();
      toast.success("Task Accepted");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="tasklist">
      <h1 className="text-3xl font-medium flex mt-10 ">
        My Tasks
        <FaArrowTurnDown className="mt-4 ml-1 text-2xl" />
      </h1>

      <div className="flex items-center justify-start gap-5 flex-wrap w-full py-1 mt-2">
        {tasks?.length > 0 ? (
          tasks.map((elem, idx) => {
            return (
              <div key={idx} className="w-100 ">
                <Card>
                  <CardHeader>
                    <CardTitle>{elem.taskTitle}</CardTitle>
                    <CardDescription className="flex justify-between">
                      <span>{elem.category}</span>
                      <div className="bg-red-600 text-white rounded px-1 text-xs flex items-center ">
                        <span>
                          Deadline:{" "}
                          {new Date(elem.taskDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}{" "}
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{elem.taskDescription}</p>
                  </CardContent>
                  <CardFooter>
                    {elem.status === "new" && (
                      <Button
                        onClick={() => handleAccept(elem._id)}
                        className="hover:bg-blue-600"
                      >
                        Accept Task
                      </Button>
                    )}
                    {elem.status === "accepted" && (
                      <Button
                        onClick={() => {
                          setSelectedTask(elem);
                          setShowModal(true);
                        }}
                        className="bg-yellow-500 text-black hover:bg-yellow-400 "
                      >
                        Submit Proof
                      </Button>
                    )}
                    {elem.status === "completed" && (
                      <Button className="bg-green-600  disabled">
                        Completed ✅
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            );
          }) /* EMPTY STATE: This shows if tasks.length is 0 */
        ) : (
          <div className="flex flex-col items-center justify-center w-full mt-5 p-5 ">
            <img
              src={img} // Update this path to your image
              alt="No tasks assigned"
              className="w-64 h-64 object-contain opacity-50 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              Tasks has never been assigned yet!!!
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Stay tuned! Once the admin assigns you a task, it will appear
              here.
            </p>
          </div>
        )}
        {showModal && (
          <SubmitProofModal
            task={selectedTask}
            onClose={() => setShowModal(false)}
            onUploadSuccess={fetchMyTasks}
            updateUserData={updateUserData}
          />
        )}
      </div>
    </div>
  );
};

export default TaskList;
