import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default Loading;
