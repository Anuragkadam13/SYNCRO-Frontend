import React from "react";
import { Button } from "../ui/button";
import logo from "../../../public/SYNCRO.png";

const Header = (props) => {
  // Check if we have a user logged in
  const isLoggedIn = !!props.data;
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between  mx-5">
      {/* Brand Section (Logo + Text Side-by-Side) */}
      <div className="flex items-center gap-4">
        {/* The Logo */}
        <img
          src={logo}
          alt="Syncro Logo"
          className="w-12 h-12 object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        />

        {/* Brand Name and Slogan */}
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-extrabold tracking-tighter bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent uppercase leading-none">
            Syncro
          </h1>
          <p className="text-[10px] text-gray-400 font-medium italic tracking-wider">
            Stay in sync, stay ahead
          </p>
        </div>
      </div>

      {/* User Actions Section */}
      {isLoggedIn ? (
        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 bg-blue-500/10 sm:bg-transparent p-3 sm:p-0 rounded-xl w-full sm:w-auto border sm:border-none">
          <div className="text-right">
            <h2 className="text-sm font-semibold text-blue-600 text-center">
              Welcome back,
            </h2>
            <span className="text-xl font-bold">
              {props.data?.firstName || "User"} 👋
            </span>
          </div>

          <Button
            onClick={props.logOut}
            variant="destructive"
            className="px-6 py-2 h-10 font-semibold shadow-lg hover:shadow-red-900/20 transition-all active:scale-95"
          >
            Log Out
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
