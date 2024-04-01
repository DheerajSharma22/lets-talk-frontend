import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { chatEndPoints } from '../../api';
import { socket } from '../../socket';

const initialState = {
    selectedChat: null,
    chats: [],
    loading: false,
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectedChat(state, action) {
            state.selectedChat = action.payload;
        },
        setChats(state, action) {
            state.chats = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        }

    }
});

export const { setSelectedChat, setChats, setLoading } = chatSlice.actions;
export default chatSlice.reducer;

export const fectchAllChats = (token) => {
    return async (dispatch, getState) => {
        const toastId = toast.loading("Loading...");
        let results = [];
        dispatch(setLoading(true));

        try {
            const res = await axios.get(chatEndPoints.FETCH_ALL_CHATS, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
            console.log(res?.data);
            if (!res?.data?.success) {
                toast.error(res?.data?.message);
            } else {
                results = res?.data?.chats;
                dispatch(setChats(res?.data?.chats));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        return results;
    }
};

export const createSingleChat = (receiverId, token) => {
    return async (dispatch, getState) => {

        const toastId = toast.loading("Loading...");

        try {
            const res = await axios.post(chatEndPoints.CREATE_SINGLE_CHAT, { receiverId }, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
            if (!res?.data?.success) {
                toast.error(res?.data?.message);
            }
            else {
                dispatch(setSelectedChat(res?.data?.chat));
                socket.emit("joinChat", res?.data?.chat?._id);
                if (res?.data?.chatCreated) {
                    const { chats } = getState().chat;
                    dispatch(setChats([...chats, res?.data?.chat]));
                }

                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export const createGroupChat = (formData, token) => {
    return async (dispatch, getState) => {

        const toastId = toast.loading("Loading...");

        try {
            const res = await axios.post(chatEndPoints.CREATE_GROUP_CHAT, formData, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
            if (!res?.data?.success) {
                toast.error(res?.data?.message);
            }
            else {
                dispatch(setSelectedChat(res?.data?.chat));
                socket.emit("joinChat", res?.data?.chat?._id);

                if (res?.data?.chatCreated) {
                    const { chats } = getState().chat;
                    dispatch(setChats([...chats, res?.data?.chat]));
                }

                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}


export const editGroupChat = (formData, token) => {
    return async (dispatch, getState) => {

        const toastId = toast.loading("Loading...");

        try {
            const res = await axios.put(chatEndPoints.EDIT_GROUP_CHAT, formData, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
            if (!res?.data?.success) {
                toast.error(res?.data?.message);
            }
            else {
                dispatch(fectchAllChats(token));
                dispatch(setSelectedChat(res?.data?.chat));
                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export const deleteGroupChat = (token, chatId) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        console.log(token);
        try {
            const res = await axios.delete(chatEndPoints.REMOVE_GROUP_CHAT + `/${chatId}`, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });

            if (!res.data.success) {
                toast.error(res?.data?.message);
            } else {
                dispatch(fectchAllChats(token));
                dispatch(setSelectedChat(null));
                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}