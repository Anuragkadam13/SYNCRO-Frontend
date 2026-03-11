import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="mx-auto flex items-center justify-center w-screen  max-w-md">
      <form
        className="flex gap-4 md:gap-6 flex-col rounded-md border shadow-lg p-6 md:p-12 dark:bg-[#171717] "
        onSubmit={submitHandler}
      >
        <h1 className="text-2xl font-semibold text-center mb-6 ">
          Login to your account
        </h1>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Enter your email..."
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <Button className="hover:bg-blue-600">Login</Button>
        <p className="text-gray-500 text-sm">
          New here?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
