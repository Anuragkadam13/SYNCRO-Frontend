import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/api";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [role, setRole] = useState("employee");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { firstName, email, password, role });
      toast.success("Registration successful! Please login.");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="mx-auto flex items-center justify-center w-screen max-w-md">
      <form
        className="flex gap-4 md:gap-4 flex-col rounded-md border shadow-lg p-6 md:p-12 dark:bg-[#171717] "
        onSubmit={handleRegister}
      >
        <h1 className="text-2xl font-semibold text-center ">Create account</h1>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            type="text"
            placeholder="Enter your name"
          />
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="password">Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
            id="password"
            type="password"
            placeholder="Enter password"
          />
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="role">Role</Label>
          <Select id="role" value={role} onValueChange={setRole}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button className="hover:bg-blue-600">Register</Button>
        <p className="text-gray-500 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
