import React, { useEffect, useState } from "react";
import UserCard from "../ChatPannel/UserCard";
import { searchUser } from "../../../Redux/Slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createGroupChat, editGroupChat } from "../../../Redux/Slice/chatSlice";

const CreateGroupModal = ({ groupData, setShowCreateGroupModal }) => {
  const { darkMode } = useSelector(state => state.themes);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [groupImg, setGroupImg] = useState("");
  const [groupImgURL, setGroupImgURL] = useState("");
  const [groupName, setGroupName] = useState("");
  const [searchInp, setSearchInp] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);

  const changeHandler = (e) => {
    setGroupImg(e.target.files[0]);
    setGroupImgURL(URL.createObjectURL(e.target.files[0]));
  };

  const searchHandler = async (e) => {
    setSearchInp(e.target.value);
    if (e.target.value.length > 0) {
      try {
        const res = await dispatch(searchUser(token, e.target.value));

        setSearchResults(res);
      } catch (error) {
        console.log("SEARCH ERROR", error);
      }
    }
  };

  const addGroupMember = (user) => {
    const userExists = groupMembers?.filter((mbr) => mbr?._id === user?._id);
    if (userExists.length > 0) {
      toast.error("Cannot add twice a user");
      return;
    }

    setGroupMembers((prev) => [...prev, user]);
  };

  const removeGroupMember = (user) => {
    const newGroupMembers = groupMembers?.filter(
      (mbr) => mbr?._id !== user?._id
    );
    setGroupMembers(newGroupMembers);
  };

  const createGroupHandler = async () => {
    const users = [];
    for (let i = 0; i < groupMembers.length; i++) {
      users.push(groupMembers[i]?._id);
    }

    const formData = new FormData();
    formData.append("chatName", groupName);
    formData.append("users", JSON.stringify(users));
    formData.append("groupImage", groupImg);

    await dispatch(createGroupChat(formData, token));
    setShowCreateGroupModal(false);
  };

  const editGroupHandler = async () => {
    if (groupImgURL === groupData?.groupImg &&
      groupMembers === groupData?.users &&
      groupName === groupData?.chatName) {
      toast.error("There is nothing to update");
      setShowCreateGroupModal(null);
      return;
    }

    const formData = new FormData();
    formData.append("chatId", groupData?._id);
    if (groupMembers !== groupData?.users) {
      formData.append('users', JSON.stringify(groupMembers));
    }
    if (groupName !== groupData?.chatName) {
      formData.append('chatName', groupName);
    }
    if (groupImgURL !== groupData?.groupImg) {
      formData.append('groupImage', groupImg);
    }

    await dispatch(editGroupChat(formData, token));
    setShowCreateGroupModal(null);
  }

  useEffect(() => {
    if (groupData) {
      setGroupImgURL(groupData?.groupImg);
      setGroupName(groupData?.chatName);
      setGroupMembers(groupData?.users);
    }
  }, []);

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 w-[100vw] ${(groupMembers.length > 0 && groupImgURL) ||
        (searchResults.length > 0 && groupImgURL) ||
        (groupMembers.length > 0 && searchResults.length > 0)
        ? "pt-52"
        : ""
        } pb-5 overflow-auto h-[100vh] bg-[rgba(0,0,0,0.8)] z-10 flex items-center justify-center`}
    >
      <div className="sm:w-[560px] rounded-md">
        {/* Modal header */}
        <div className="flex items-center justify-between px-8 py-4 bg-green-600 rounded-t-md text-white text-xl font-semibold">
          <h4>{!groupData ? "Create New Group" : "Edit Group Details"}</h4>
          <span
            className="cursor-pointer"
            onClick={() => setShowCreateGroupModal(false)}
          >
            &times;
          </span>
        </div>

        {/* Modal Body */}
        <div className={`flex flex-col gap-5 items-center justify-between px-8 py-4 ${!darkMode ? "bg-pure-greys-5" : "bg-pure-greys-900"} rounded-b-md`}>
          {/* For selecting group image */}
          <div className="flex items-center justify-center flex-col gap-2 w-full">
            {groupImgURL && (
              <img
                src={groupImgURL}
                alt="group"
                className="w-32 h-32 rounded-full"
              />
            )}
            <div className="mt-5">
              <label
                className="py-2 px-5 bg-gray-300 rounded-md font-semibold cursor-pointer"
                htmlFor="fileSelect"
              >
                Select Group Image
              </label>
              <input
                type="file"
                onChange={changeHandler}
                id="fileSelect"
                className="hidden"
              />
            </div>
          </div>

          {/* For Group Name */}
          <div className="flex flex-col gap-2 w-full mt-5">
            <label htmlFor="groupName" className={`${darkMode ? "text-white" : "text-black"}`}>Group Name</label>
            <input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              type="text"
              placeholder="Enter Group Name"
              className={`outline-none px-3 py-3 rounded-md border-none w-full text-md ${darkMode ? "text-white" : "text-black"} ${darkMode ? "bg-pure-greys-600" : "bg-pure-greys-50"}`}
            />
          </div>

          {/* For Group Members */}
          <div className="w-full flex flex-col gap-2 mt-5">
            <p className={`${darkMode ? "text-white" : "text-black"}`}>Group Members</p>
            {groupMembers && groupMembers.length > 0 && (
              <div className="my-3 flex items-center flex-wrap gap-3 max-h-24 overflow-y-auto">
                {groupMembers?.map((mbr) => {
                  return (
                    <div
                      className="flex items-center bg-secondary gap-2 px-5 py-2 rounded-full text-sm"
                      key={mbr?._id}
                    >
                      <p>{mbr?.username}</p>
                      <span
                        className="cursor-pointer"
                        onClick={() => removeGroupMember(mbr)}
                      >
                        &times;
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            <input
              value={searchInp}
              onChange={searchHandler}
              type="text"
              placeholder="Search members"
              className={`outline-none px-3 py-3 rounded-md border-none w-full text-md ${darkMode ? "text-white" : "text-black"} ${darkMode ? "bg-pure-greys-600" : "bg-pure-greys-50"}`}
            />

            {searchResults?.length > 0 && (
              <div className="max-h-[100px] overflow-x-hidden overflow-y-auto w-full flex flex-col gap-3 py-5">
                {searchResults?.map((res) => {
                  return (
                    <div onClick={() => addGroupMember(res)} key={res?._id}>
                      <UserCard user={res} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Create Group Or Close Btn */}
          <div className="flex items-center justify-end w-full gap-5">
            <button
              className="text-sm text-red-600 font-semibold hover:pb-1 hover:border-b border-red-700"
              onClick={() => setShowCreateGroupModal(false)}
            >
              &times; Close
            </button>
            {groupData ? <button
              className="bg-secondary px-6 py-2 rounded-md text-white"
              onClick={editGroupHandler}
            >
              Edit Group
            </button> :
              <button
                className="bg-secondary px-6 py-2 rounded-md text-white"
                onClick={createGroupHandler}
              >
                Create Group
              </button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
