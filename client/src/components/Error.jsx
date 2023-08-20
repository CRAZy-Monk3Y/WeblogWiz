import React from "react";
import { Link } from "react-router-dom";

const Error = ({ message }) => {
  return (
    <div className="w-full py-12 flex justify-center items-center flex-col gap-2">
      <h1 className="text-2xl uppercase text-red-600">Some Error occured</h1>
      <p>
        {message}. <Link to="/" className="text-blue-400">Go Back to Home</Link>
      </p>
    </div>
  );
};

export default Error;
