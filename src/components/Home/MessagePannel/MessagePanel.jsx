import React, { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { createSingleChat, fectchAllChats } from "../../../Redux/Slice/chatSlice";
import ChatCard from "../ChatPannel/ChatCard";
import { searchUser } from "../../../Redux/Slice/userSlice";
import UserCard from "../ChatPannel/UserCard";
import { socket } from "../../../socket";
import { GoPlusCircle } from "react-icons/go";
import CreateGroupModal from "./CreateGroupModal";

const MessagePanel = () => {
  const { darkMode } = useSelector(state => state.themes);
  const { chats } = useSelector(state => state.chat);
  const { token } = useSelector(state => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const dispatch = useDispatch();

  const getChats = async () => {
    const res = await dispatch(fectchAllChats(token));
    setSearchResults(res);
  }

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    setSearchResults(chats);
  }, [chats]);

  const changeHandler = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      try {
        const res = await dispatch(searchUser(token, e.target.value));
        setSearchResults(res);
      } catch (error) {
        console.log("SEARCH ERROR", error);
      }
    } else {
      setSearchResults(chats);
    }
  }

  return (
    <>
      <div className={`lg:w-[380px] lg:h-[100vh] lg:fixed overflow-auto mb-16 ${darkMode ? "bg-pure-greys-900" : "bg-pure-greys-25"}`}>
        {/* Header */}
        <div className={`flex flex-col px-5 py-5 ${darkMode ? "bg-pure-greys-900" : "bg-pure-greys-25"} gap-5 fixed lg:w-[380px] w-full border-b ${darkMode ?"border-pure-greys-500" : "border-pure-greys-50"}`}>
          <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>Messages</h3>
          <div className={`flex items-center gap-2 ${darkMode ? "bg-pure-greys-600" : "bg-pure-greys-50"} rounded-md px-3 py-2`}>
            <MdOutlineSearch className={`text-md ${darkMode ? "text-white" : "text-black"}`} />
            <input
              type="text"
              placeholder="Search here..."
              className={`outline-none border-none w-full text-md ${darkMode ? "text-white" : "text-black"} ${darkMode ? "bg-pure-greys-600" : "bg-pure-greys-50"}`}
              value={searchQuery}
              onChange={changeHandler}
            />
          </div>
        </div>

        {/* Single Chats */}
        <div className="mt-[150px] p-5">
          <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>Chats</h3>
          <div className="flex items-center flex-col gap-2 mt-5">

            {
              searchResults?.length === 0 ? <p>No chats Found</p> : (
                searchResults.map((chat) => {
                  return searchQuery.length > 0 ?
                    <div key={chat?._id} className="w-full" onClick={() => {
                      dispatch(createSingleChat(chat?._id, token));
                      setSearchResults(chats)
                      setSearchQuery("");
                    }}>
                      <UserCard user={chat} setSearchQuery={setSearchQuery} />
                    </div>
                    : !chat.isGroupChat && <div className="w-full" onClick={() => socket.emit("joinChat", chat?._id)} key={chat?._id} >
                      <ChatCard chat={chat} />
                    </div>
                })
              )
            }
          </div>
        </div>

        {/* Group Chats */}
        <div className="mt-5 p-5">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>Groups</h3>
            <button className={`text-xl text-secondary`} onClick={() => setShowCreateGroupModal(true)}>
              <GoPlusCircle />
            </button>
          </div>
          <div className="flex items-center flex-col gap-2 mt-5">

            {
              searchResults?.length === 0 ? <p>No chats Found</p> : (
                searchResults.map((chat) => (
                  chat.isGroupChat && <div key={chat?._id} onClick={() => socket.emit("joinChat")} className="w-full">
                    <ChatCard chat={chat} isGroupChat={true} />
                  </div>

                ))
              )
            }
          </div>
        </div>

      </div>
      {showCreateGroupModal && <CreateGroupModal setShowCreateGroupModal={setShowCreateGroupModal} />}
    </>
  );
};

export default MessagePanel;
