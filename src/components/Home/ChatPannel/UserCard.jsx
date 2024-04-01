import React from 'react';
import { useSelector } from 'react-redux';

const UserCard = ({ user }) => {
    const { darkMode } = useSelector(state => state.themes);

    return (
        <div className={`flex items-center px-2 py-3 border-2 border-secondary gap-3 w-full cursor-pointer rounded-md`}>
            <img src={user?.image} alt="avatar" className="w-12 h-12 rounded-full" />
            <div className="flex flex-col gap-1">
                <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-black"}`}>{user?.username}</p>
                {/* <p className="text-sm text-gray-500">{chat?.latestMessage?.message}</p> */}
            </div>
        </div>
    )
}

export default UserCard
