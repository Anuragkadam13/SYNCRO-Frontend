import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import api from "./utils/api";
import Header from "./components/others/Header";
import { toast } from "sonner";
import Loading from "./components/others/Loading";
function App() {
  const [user, setUser] = useState(null); // Role: 'admin' or 'employee'
  const [userData, setUserData] = useState(null); // Full user object from DB
  const [isLoading, setIsLoading] = useState(true); // Start as true

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser.role);
      setUserData(parsedUser);
    }
    // Artificial delay of 1.5s so the user sees the cool branding
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const updateUserData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (storedUser && (storedUser._id || storedUser.id)) {
        const userId = storedUser._id || storedUser.id;
        const response = await api.get(`/auth/me/${userId}`);
        const freshUser = response.data;
        setUserData(freshUser);
        localStorage.setItem("loggedInUser", JSON.stringify(freshUser));
      }
    } catch (err) {
      console.error("Failed to sync user data:", err);
    }
  };

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user: loggedUser } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
      setUser(loggedUser.role);
      setUserData(loggedUser);
      setTimeout(() => setIsLoading(false), 1000); // Small delay for smooth transition
      toast.success("Login successfull");
    } catch (err) {
      setIsLoading(false); // Stop loading if error
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setUserData(null);
    toast.success("Signed out");
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Router>
      <div className="flex flex-col py-5 min-h-screen animate-fade-in">
        <Header data={userData} logOut={handleLogout} />
        <div className="grow flex items-center justify-center">
          <Routes>
            <Route
              path="/"
              element={
                !user ? (
                  <Login handleLogin={handleLogin} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/dashboard"
              element={
                user === "admin" ? (
                  <AdminDashboard
                    data={userData}
                    updateUserData={updateUserData}
                  />
                ) : user === "employee" ? (
                  <EmployeeDashboard
                    data={userData}
                    updateUserData={updateUserData}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
