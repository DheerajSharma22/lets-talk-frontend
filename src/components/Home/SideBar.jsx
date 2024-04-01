import React from "react";
import logo from "../../assets/logo.png";
import { FaRegUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from '../../Redux/Slice/themeSlice';

const SideBar = ({ leftPanel, setLeftPanel }) => {
  const { darkMode } = useSelector(state => state.themes);
  const dispatch = useDispatch();
  return (
    <nav className={`flex items-center justify-between p-5 lg:flex-col bg-primary lg:w-[100px] lg:h-[100vh] fixed w-screen h-16 flex-row z-10 bottom-0`}>
      <div className="flex items-center lg:flex-col flex-row gap-10 w-full">
        {/* Logo */}
        <img src={logo} alt="Logo" className="lg:flex hidden" />

        <ul className={`flex items-center lg:flex-col flex-row lg:gap-5 justify-between w-full ${darkMode ? "text-black" : "text-white"}`}>
          <li className={`sm:w-12 sm:h-12 w-8 h-8 bg-opacity-20 cursor-pointer rounded-full flex items-center justify-center sm:text-xl text-lg ${leftPanel === "profile" ? "bg-black" : ""}`} onClick={() => setLeftPanel("profile")}>
            <FaRegUser />
          </li>
          <li className={`sm:w-12 sm:h-12 w-8 h-8 bg-opacity-20 cursor-pointer rounded-full flex items-center justify-center  sm:text-xl  text-lg ${leftPanel === "message" ? "bg-black" : ""}`} onClick={() => setLeftPanel("message")}>
            <LuMessagesSquare />
          </li>
          <li className={`sm:w-12 sm:h-12 w-8 h-8 bg-opacity-20 cursor-pointer rounded-full flex items-center justify-center  sm:text-xl  text-lg ${leftPanel === "setting" ? "bg-black" : ""}`} onClick={() => setLeftPanel("setting")}>
            <IoSettingsOutline />
          </li>
          <div className="lg:hidden block">
            <span className={`${darkMode ? "text-black" : "text-white"} sm:text-xl text-lg cursor-pointer`} onClick={() => dispatch(setDarkMode(!darkMode))}>
              <MdOutlineDarkMode />
            </span>
          </div>
        </ul>
      </div>
      <div className="lg:block hidden">
        <span className={`${darkMode ? "text-black" : "text-white"} text-2xl cursor-pointer`} onClick={() => dispatch(setDarkMode(!darkMode))}>
          <MdOutlineDarkMode />
        </span>
      </div>

    </nav>
  );
};

export default SideBar;
