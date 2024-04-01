import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import RenderDocument from "../../Common/RenderDocument";
import getFileType from "../../../Utitlity/getFileType";

const ChatBox = ({ messages }) => {
  const { darkMode } = useSelector(state => state.themes);
  const { user } = useSelector((state) => state.user);


  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: window.document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div
      className={`flex flex-col gap-y-8 max-h-[100%] overflow-auto ${darkMode ? "bg-pure-greys-800" : "bg-white"} pt-28 pb-24 px-5`}
    >
      {messages?.length > 0
        ? messages?.map((msg, index) => {
          return (


            msg?.file ?
              <div

                key={index}
                className={`p-2 w-fit max-w-[80%] rounded-md ${user?._id !== msg?.sender?._id
                  ? "bg-gray-500"
                  : "bg-gray-500 text-white self-end"
                  }`}
              >
                <a href={msg?.file} target="_blank" download={true}>
                  <RenderDocument file={getFileType(msg?.file)} url={msg?.file} fileName={msg?.fileName} />
                </a>
              </div> :
              <div

                key={index}
                className={`px-5 py-2 w-fit max-w-[80%] rounded-md ${user?._id !== msg?.sender?._id
                  ? "bg-gray-100"
                  : "bg-secondary text-white self-end"
                  }`}
              >

                <p>{msg?.message}</p>
              </div>
          );
        })
        : ""
      }
    </div>
  );
};

export default ChatBox;
