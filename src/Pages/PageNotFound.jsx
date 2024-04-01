import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 text-center w-screen h-screen">
      <h1 className="text-6xl font-bold ">404</h1>
      <p className="text-xl text-gray-800 font-semibold">
        Oops! Page Not Found
      </p>
      <Link
        to="/"
        className="bg-green-400 text-black font-semibold px-6 py-2 rounded-md flex items-center gap-2"
      >
        <FaArrowLeft />
        Back to home
      </Link>
    </div>
  );
};

export default PageNotFound;
