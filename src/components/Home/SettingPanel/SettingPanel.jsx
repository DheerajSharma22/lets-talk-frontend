import React, { useState } from "react";
import profileBanner from "../../../assets/setting_banner.jpg";
import { FaCamera } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, editProfilePic } from "../../../Redux/Slice/userSlice";
import toast from "react-hot-toast";


const SettingPanel = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { darkMode } = useSelector(state => state.themes);
  const [profileImg, setProfileImg] = useState(null);
  const [profileInfo, setProfileInfo] = useState({
    username: user?.username,
    location: user?.location,
    bio: user?.bio,
    phone: user?.phone,
  });

  const dispatch = useDispatch();

  const updateImgHandler = () => {
    const formData = new FormData();
    formData.append("image", profileImg);
    dispatch(editProfilePic(token, formData));
  };

  const changeHandler = (e) => {
    setProfileInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const editProfileHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (profileInfo.username === user?.username &&
      profileInfo.location === user?.location &&
      profileInfo.phone === user?.phone &&
      profileInfo.bio === user?.bio) {
      return toast.error("There is nothing to update");
    }

    if (profileInfo.username !== user?.username) formData.append("username", profileInfo.username);
    if (profileInfo.location !== user?.location) formData.append("location", profileInfo.location);
    if (profileInfo.bio !== user?.bio) formData.append("bio", profileInfo.bio);
    if (profileInfo.phone !== user?.phone) formData.append("phone", profileInfo.phone);

    dispatch(editProfile(token, formData));
  };

  return (
    <div className={`lg:w-[380px] lg:h-[100vh] lg:fixed ${darkMode ? "bg-pure-greys-900" : "bg-pure-greys-25"} overflow-auto mb-16`}>
      {/* Header */}
      <div className="relative h-[180px]">
        <img
          src={profileBanner}
          alt="profile banner"
          className="w-full h-[180px] object-cover z-0"
        />
        <div className={`bg-black w-full h-[180px] absolute top-0 bg-opacity-40`}></div>
        <div className="py-5 px-3 absolute top-0 left-0 w-full">
          <div className="flex items-center justify-between text-white">
            <h3 className="text-xl font-bold ">Settings</h3>
          </div>
        </div>

        <div className="flex flex-col items-center text-center w-full absolute top-[75%] gap-5 border-b border-gray-300 pb-5">
          <div className="relative">
            <img
              src={profileImg ? URL.createObjectURL(profileImg) : user?.image}
              alt="avatar"
              className={`w-28 h-28 rounded-full  p-2`}
            />

            <label
              htmlFor="selectFile"
              className={`w-8 h-8 rounded-full absolute bottom-[10%] flex items-center right-[0%] justify-center cursor-pointer ${darkMode ? "bg-black text-white" : "text-black bg-gray-200"}`}
            >
              <FaCamera />
            </label>
            <input
              type="file"
              id="selectFile"
              className="hidden"
              onChange={(e) => setProfileImg(e.target.files[0])}
            />
          </div>
          <div className="flex flex-col gap-1">
            <button
              className="bg-secondary px-6 py-2 rounded-md font-medium"
              onClick={updateImgHandler}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-[160px] px-5 py-5">
        <form
          className={`flex flex-col gap-5 `}
          onSubmit={editProfileHandler}
        >
          <div className="flex flex-col gap-2">
            <label className={`${darkMode ? "text-white" : "text-black"}`} htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={profileInfo?.username}
              onChange={changeHandler}
              className={`outline-none px-3 py-2 rounded-md border-none w-full text-md ${darkMode ? "text-white" : "text-black"} ${darkMode ? "bg-pure-greys-600" : "bg-pure-greys-50"}`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={`${darkMode ? "text-white" : "text-black"}`} htmlFor="bio">Profile Bio</label>
            <textarea
              type="text"
              name="bio"
              id="bio"
              value={profileInfo?.bio}
              onChange={changeHandler}
              className={`outline-none px-3 py-2 rounded-md border-none w-full text-md resize-none min-h-[130px] ${darkMode ? "text-white" : "text-black"} ${darkMode ? "bg-pure-greys-600" : "bg-pure-greys-50"}`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={`${darkMode ? "text-white" : "text-black"}`} htmlFor="phone">Phone</label>
            <input
              type="number"
              name="phone"
              id="phone"
              value={profileInfo?.phone}
              onChange={changeHandler}
              className={`outline-none px-3 py-2 rounded-md border-none w-full text-md ${darkMode ? "text-white" : "text-black"} ${darkMode ? "bg-pure-greys-600" : "bg-pure-greys-50"}`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={`${darkMode ? "text-white" : "text-black"}`} htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              value={profileInfo?.location}
              onChange={changeHandler}
              className={`outline-none px-3 py-2 rounded-md border-none w-full text-md ${darkMode ? "text-white" : "text-black"} ${darkMode ? "bg-pure-greys-600" : "bg-pure-greys-50"}`}
            />
          </div>

          <button className="w-full bg-secondary py-2 px-6 font-medium rounded-md">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingPanel;
