import React, { useState } from "react";
import profileBanner from "../../../assets/profile_banner.jpg";
import {
  MdOutlineEdit,
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlineLogout,
  MdOutlineMoreVert,
  MdOutlinePhone,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../Redux/Slice/authSlice';

const ProfilePanel = ({ setLeftPanel }) => {
  const { darkMode } = useSelector(state => state.themes);
  const { user } = useSelector(state => state.user);
  const [showMoreOptionBox, setShowMoreOptionBox] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={`lg:w-[380px] lg:h-[100vh] lg:fixed ${darkMode ? "bg-pure-greys-900" : "bg-pure-greys-25"} overflow-auto mb-16`}>
      {/* Header */}
      <div className="relative h-[180px]">
        <img
          src={profileBanner}
          alt="profile banner"
          className="w-full h-[180px] object-cover z-0"
        />
        <div className="bg-black w-full h-[180px] absolute top-0 bg-opacity-40"></div>
        <div className="py-5 px-3 absolute top-0 left-0 w-full">
          <div className="flex items-center justify-between text-white">
            <h3 className="text-xl font-bold ">My Profile</h3>
            <div className="text-3xl cursor-pointer relative">
              <MdOutlineMoreVert onClick={() => setShowMoreOptionBox(!showMoreOptionBox)} />
              <div className={`${darkMode ? "bg-pure-greys-900 text-white" : "bg-white text-black"} absolute right-0 min-w-[150px] pt-3 rounded-md  flex-col gap-3 ${showMoreOptionBox ? "flex" : "hidden"}`}>
                <div className={'flex items-center justify-between text-sm border-b pb-3 px-5 border-gray-100'} onClick={() => setLeftPanel("setting")}>
                  <p>Edit</p>
                  <p>
                    <MdOutlineEdit />
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm pb-3 px-5" onClick={() => dispatch(logout(navigate))}>
                  <p>Logout</p>
                  <MdOutlineLogout />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center w-full absolute top-[75%] gap-5 border-b border-gray-300 pb-5">
          <img
            src={user?.image}
            alt="avatar"
            className="w-28 h-28 rounded-full bg-white p-2"
          />
          <div className="flex flex-col gap-1">
            <p className={`font-semibold text-xl ${darkMode ? "text-white" : "text-black"}`}>{user?.username}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-[160px] px-5 py-5">
        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"} text-justify leading-relaxed`}>
          {user?.bio}
        </p>

        <div className={`mt-8 flex flex-col gap-5 ${darkMode ? "text-white" : "text-black"}`}>
          <div className="flex items-center gap-5">
            <FaRegUser />
            {user?.username}
          </div>
          <div className="flex items-center gap-5">
            <MdOutlinePhone />
            {user?.phone}
          </div>
          <div className="flex items-center gap-5">
            <MdOutlineEmail />
            {user?.email}
          </div>
          <div className="flex items-center gap-5">
            <MdOutlineLocationOn />
            {user?.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
