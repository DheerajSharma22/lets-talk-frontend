import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import {
  MdAttachFile,
  MdFileCopy,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../Redux/Slice/messageSlice";
import { socket } from "../../../socket";

const SendMessageBox = ({ chat }) => {
  const { darkMode } = useSelector(state => state.themes);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector(state => state.user);
  const [messageInp, setMessageInp] = useState("");
  const [attachment, setAttachment] = useState(null);
  const dispatch = useDispatch();

  const sendMessageHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("chatId", chat?._id);
    formData.append("message", messageInp);
    formData.append("file", attachment);

    dispatch(sendMessage(formData, token));
    setAttachment(null);
    setMessageInp("");
  };

  const changeAttachmentHandler = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
    setMessageInp("");
  };

  return (
    <div>
      <form
        onSubmit={sendMessageHandler}
        className={`flex items-center sm:gap-10 gap-3 h-16 border-t ${darkMode ? "bg-black" : "bg-white"} z-1 border-gray-300 fixed bottom-0 lg:w-[calc(100vw-480px)] w-full px-5`}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="relative">
            <label htmlFor="selectAttachment">
              <MdAttachFile className="text-lg text-gray-500 cursor-pointer" />
            </label>
            <input
              type="file"
              id="selectAttachment"
              className="hidden"
              onChange={changeAttachmentHandler}
            />
          </div>
          {attachment ? (
            <div className={`border border-green-600 px-6 py-2 rounded-full flex items-center justify-between w-full ${darkMode ? "text-white" : "text-black"}`}>
              <div className="flex items-center gap-2">
                <MdFileCopy />
                {attachment?.name}
              </div>
              <span
                className="text-xl cursor-pointer"
                onClick={() => setAttachment(null)}
              >
                &times;
              </span>
            </div>
          ) : (
            <input
              value={messageInp}
              onChange={(e) => setMessageInp(e.target.value)}
              type="text"
              placeholder="Type your message..."
              className={`outline-none px-3 py-2 rounded-md border-none w-full text-md ${darkMode ? "text-white" : "text-black"} ${darkMode ? "bg-pure-greys-600" : "bg-pure-greys-50"}`}
              onFocus={() => socket.emit("typing", user?._id)}
              onBlur={() => socket.emit("notTyping", user?._id)}
            />
          )}
        </div>
        <button type="submit" className={`${darkMode ? "text-white" : "text-black"}`}>
          <IoSend />
        </button>
      </form>
    </div>
  );
};

export default SendMessageBox;
