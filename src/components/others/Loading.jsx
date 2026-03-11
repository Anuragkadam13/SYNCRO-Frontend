// src/components/UI/Loading.jsx
import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Animated Rings */}
        <div className="absolute h-24 w-24 animate-ping rounded-full border-2 border-blue-400 opacity-20"></div>
        <div className="absolute h-32 w-32 animate-pulse rounded-full border border-blue-600 opacity-10"></div>

        {/* Logo */}
        <h1 className="text-4xl font-black tracking-tighter bg-linear-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent uppercase  animate-bounce">
          Syncro
        </h1>
      </div>

      {/* Slogan & Progress Text */}
      <div className="mt-8 flex flex-col items-center">
        <p className="text-xs text-gray-500 font-semibold tracking-widest uppercase animate-pulse">
          Synchronizing Workspace...
        </p>
        <div className="mt-4 h-1 w-48 overflow-hidden rounded-full bg-blue-900">
          <div className="h-full w-full origin-left animate-loading-bar bg-linear-to-r from-blue-400 to-blue-600"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
