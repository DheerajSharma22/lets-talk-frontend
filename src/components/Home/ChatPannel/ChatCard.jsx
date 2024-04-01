import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedChat } from '../../../Redux/Slice/chatSlice';
import { getSenderImage, getSenderUsername } from '../../../Utitlity/chat';
import { socket } from '../../../socket';

const ChatCard = ({ chat, isGroupChat }) => {
    const { darkMode } = useSelector((state) => state.themes);
    const { user } = useSelector(state => state.user);
    const { selectedChat } = useSelector(state => state.chat);
    const dispatch = useDispatch();

    const handleClick = () => {
        socket.emit("joinChat", chat?._id);
        dispatch(setSelectedChat(chat));
    }

    return (
        <div className={`flex items-center px-2 py-3 ${selectedChat?._id === chat?._id ? "bg-secondary" : "border-2 border-secondary"} gap-3 w-full cursor-pointer rounded-md`} onClick={handleClick}>
            <img src={!isGroupChat ? getSenderImage(user, chat) : chat?.groupImg} alt="avatar" className="w-12 h-12 rounded-full" />
            <div className="flex flex-col gap-1">
                <p className={`text-sm font-semibold ${selectedChat?._id === chat?._id ? "text-black" : darkMode ? "text-white" : "text-black"}`}>{!isGroupChat ? getSenderUsername(user, chat) : chat?.chatName}</p>
                <p className={`text-sm ${selectedChat?._id === chat?._id ? "text-richblack-800" : darkMode ? "text-richblack-100" : "text-richblack-400"}`}>{chat?.latestMessage?.message}</p>
            </div>
        </div>
    )
}

export default ChatCard
