import React, { useEffect, useState } from "react";
import AllTask from "../others/AllTask";
import CreateTask from "../others/CreateTask";
import api from "../../utils/api";

const AdminDashboard = (props) => {
  const [employees, setEmployees] = useState([]);

  const fetchAllData = async () => {
    const res = await api.get("/auth/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <div className="h-screen w-full p-5">
      <CreateTask
        data={props.data}
        refreshData={fetchAllData}
        employees={employees}
      />
      <AllTask employees={employees} />
    </div>
  );
};

export default AdminDashboard;
