import LoadingContext from "@/context/Loader/LoadingContext";
import React, { useContext } from "react";

const Loader = () => {
  const context = useContext(LoadingContext);
  const { isLoading } = context;

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300/50">
      <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-black"></div>
    </div>
  );
};

export default Loader;
