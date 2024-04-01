import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaTrash } from "react-icons/fa6";
import ChatBox from "./ChatBox";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroupChat, setSelectedChat } from "../../../Redux/Slice/chatSlice";
import {
  getSenderId,
  getSenderImage,
  getSenderUsername,
} from "../../../Utitlity/chat";
import Loading from "../../Common/Loading";
import SendMessageBox from "./SendMessageBox";
import {
  getChatMessages,
  setMessages,
} from "../../../Redux/Slice/messageSlice";
import { socket } from "../../../socket";
import { getUserStatus } from "../../../Redux/Slice/userSlice";
import { MdMoreVert } from "react-icons/md";
import { FaEdit, FaUserFriends } from "react-icons/fa";
import CreateGroupModal from "../MessagePannel/CreateGroupModal";

const ChatPannel = () => {
  const { darkMode } = useSelector((state) => state.themes);
  const { selectedChat } = useSelector((state) => state.chat);
  const { token } = useSelector((state) => state.auth);
  const { user, userStatus } = useSelector((state) => state.user);
  const { loading, messages } = useSelector((state) => state.message);
  const [groupData, setGroupData] = useState(null);
  const [isTyping, setIsTyping] = useState({});

  const [receivedMessages, setReceivedMessage] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        await dispatch(getChatMessages(token, selectedChat?._id));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    dispatch(getUserStatus(token));

    socket.on("newMessage", (msg) => {
      setReceivedMessage(msg);
    });

    socket.on("new-user-connected", (userId) => {
      dispatch(getUserStatus(token));
    });

    socket.on("user-disconnected", (userId) => {
      dispatch(getUserStatus(token));
    });

    socket.on("isTyping", (userId) =>
      setIsTyping({ ...isTyping, [userId]: true })
    );
    socket.on("isNotTyping", (userId) =>
      setIsTyping({ ...isTyping, [userId]: false })
    );
  }, []);

  useEffect(() => {
    dispatch(setMessages([...messages, receivedMessages]));
  }, [receivedMessages]);

  const getStatus = () => {
    const status = userStatus?.filter(
      (usr) => usr.user === getSenderId(user, selectedChat)
    );
    return status.length > 0 ? "online" : "offline";
  };

  if (loading) return <Loading></Loading>;

  return (
    <div className="">
      {/* Header */}
      <div
        className={`flex items-center ${darkMode ? "bg-black" : "bg-white"
          } justify-between lg:w-[calc(100vw-480px)] h-20 px-5 border-b border-dashed fixed w-full`}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className="bg-green-400 p-1 rounded-sm lg:hidden flex"
              onClick={() => dispatch(setSelectedChat(null))}
            >
              <FaChevronLeft className="text-sm text-white" />
            </div>
            <img
              src={
                !selectedChat?.isGroupChat
                  ? getSenderImage(user, selectedChat)
                  : selectedChat?.groupImg
              }
              alt="chat avatar"
              className="w-12 h-12 rounded-full"
            />
          </div>

          <div className="flex flex-col text-sm">
            <p
              className={`${darkMode ? "text-white" : "text-black"} font-bold`}
            >
              {!selectedChat?.isGroupChat
                ? getSenderUsername(user, selectedChat)
                : selectedChat?.chatName}
            </p>
            <p className="text-pure-greys-200">
              {isTyping?.hasOwnProperty(getSenderId(user, selectedChat)) &&
                isTyping[getSenderId(user, selectedChat)]
                ? "typing..."
                : !selectedChat?.isGroupChat
                  ? getStatus()
                  : selectedChat?.users?.length + " Members"}
            </p>
          </div>
        </div>

        {selectedChat &&
          selectedChat.isGroupChat &&
          selectedChat.groupAdmin?._id === user?._id && (
            <div className="relative group">
              <MdMoreVert
                className={`${darkMode ? "text-white" : "text-black"
                  } text-xl cursor-pointer`}
              />

              <div
                className={`${darkMode
                  ? "bg-pure-greys-900 text-white"
                  : "bg-pure-greys-5 text-black"
                  } absolute right-2 min-w-[180px] pt-3 rounded-md flex flex-col gap-2 invisible group-hover:visible`}
              >
                <div className={"flex items-center text-sm pb-3 px-5 gap-3 cursor-pointer"} onClick={() => setGroupData(selectedChat)}>
                  <p>
                    <FaEdit />
                  </p>
                  <p>Edit Group</p>
                </div>
                <div className="flex items-center text-sm pb-3 px-5 gap-3 cursor-pointer" onClick={() => dispatch(deleteGroupChat(token, selectedChat?._id))}>
                  <FaTrash />
                  <p>Delete Group</p>
                </div>
              </div>
            </div>
          )}
      </div>

      {/* Chat box */}
      <div>
        <ChatBox messages={messages} />
      </div>

      {/* Footer */}
      <SendMessageBox chat={selectedChat} />

      {groupData && <CreateGroupModal groupData={selectedChat} setShowCreateGroupModal={setGroupData} />}
    </div>
  );
};

export default ChatPannel;
