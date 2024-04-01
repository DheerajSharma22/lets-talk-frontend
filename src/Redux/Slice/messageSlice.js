import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { messageEndPoints } from '../../api';
import { socket } from '../../socket';

const initialState = {
    messages: [],
    loading: false,
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessages(state, action) {
            state.messages = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        }

    }
});

export const { setMessages, setLoading } = messageSlice.actions;
export default messageSlice.reducer;

export const sendMessage = (formData, token) => {
    return async (dispatch, getState) => {
        const toastId = toast.loading("Loading...");

        try {
            let res = await axios.post(messageEndPoints.SEND_MESSAGE, formData, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });

            if (!res?.data?.success) {
                toast.error(res?.data?.message);
            }
            else {
                const { messages } = getState().message;
                socket.emit("sendMessage", res?.data?.createdMessage);
                dispatch(setMessages([...messages, res?.data?.createdMessage]));
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export const getChatMessages = (token, chatId) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");

        try {
            const res = await axios.get(messageEndPoints.GET_CHAT_MESSAGES + `/${chatId}`, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
            if (!res?.data?.success) {
                toast.error(res?.data?.message);
            }
            else {
                dispatch(setMessages(res?.data?.messages));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
