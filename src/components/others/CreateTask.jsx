import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BsCalendarDate } from "react-icons/bs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

const CreateTask = ({ data, refreshData, employees }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState(""); // Stores the Employee ID
  const [category, setCategory] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const taskData = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      assignedTo: assignTo,
      createdBy: data.id,
    };

    try {
      const response = await api.post("/tasks/create", taskData);
      toast.success(response.data.message);

      await refreshData();

      setTaskTitle("");
      setTaskDescription("");
      setTaskDate("");
      setAssignTo("");
      setCategory("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating task");
    }
  };
  return (
    <div className="border rounded-xl px-6 py-8 shadow-md ">
      <h2 className="text-2xl font-semibold mb-2 ">Create New Task</h2>
      <form
        className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6"
        onSubmit={submitHandler}
      >
        <div className="left w-full md:w-[45%] flex flex-col gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Task Title</Label>
            <Input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              type="text"
              id="title"
              placeholder="Make a UI design..."
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="date">Deadline</Label>
            <Popover id="date">
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(!taskDate && "text-muted-foreground")}
                >
                  {taskDate ? (
                    format(taskDate, "yyyy-MM-dd")
                  ) : (
                    <span className="flex items-center gap-1">
                      <BsCalendarDate />
                      Select a date
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={taskDate}
                  onSelect={setTaskDate}
                  initialFocus
                  className="rdp-day_selected:bg-blue-500 rdp-day_selected:text-white w-full"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="assign">Assign To</Label>
            <Select
              id="assign"
              required
              value={assignTo}
              onValueChange={setAssignTo}
            >
              <SelectTrigger className="flex w-full">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Employees</SelectLabel>
                  {employees?.map((employee) => (
                    <SelectItem key={employee._id} value={employee._id}>
                      {employee.firstName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="category">Category</Label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              id="category"
              placeholder="Design, Dev etc"
              required
            />
          </div>
        </div>
        <div className="right w-full md:w-[45%] flex flex-col gap-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="resize-none h-44"
              placeholder="Add Description"
              id="description"
              required
            />
          </div>
          <Button type="submit" className="hover:bg-blue-600">
            Assign Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
