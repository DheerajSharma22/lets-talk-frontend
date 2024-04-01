import React, { useEffect, useState } from 'react'
import SideBar from '../components/Home/SideBar'
import MessagePanel from '../components/Home/MessagePannel/MessagePanel'
import ProfilePanel from '../components/Home/ProfilePanel/ProfilePanel'
import SettingPanel from '../components/Home/SettingPanel/SettingPanel'
import ChatPannel from '../components/Home/ChatPannel/ChatPannel'
import { socket } from '../socket';
import logo from '../assets/logo.png';
import { useSelector } from 'react-redux'

const Home = () => {
    const { darkMode } = useSelector(state => state.themes);
    const [leftPanel, setLeftPanel] = useState("message");
    const { selectedChat } = useSelector(state => state.chat);
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        socket.connect();
        socket.emit('userJoined', user?._id);
        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <div>
            <div className={`lg:block ${selectedChat ? "hidden" : ""}`}>
                <SideBar leftPanel={leftPanel} setLeftPanel={setLeftPanel} />
            </div>
            <div
                className={`lg:ml-[100px] lg:block ${selectedChat ? "hidden" : ""}`}
            >
                {leftPanel === "message" ? (
                    <MessagePanel />
                ) : leftPanel === "profile" ? (
                    <ProfilePanel setLeftPanel={setLeftPanel} />
                ) : leftPanel === "setting" && (
                    <SettingPanel />
                )}
            </div>
            <div
                className={`lg:ml-[480px] lg:block ${!selectedChat ? "hidden" : ""}`}
            >
                {
                    selectedChat ? <ChatPannel /> : <div className={`text-center flex flex-col gap-5 items-center justify-center ${darkMode ? "bg-black text-white" : "bg-white text-black"} min-h-screen w-[calc(100vw-480px)]`}>
                        <img src={logo} className='w-20 h-20' alt='logo' />
                        <p className='text-2xl '>No selected chat</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Home
