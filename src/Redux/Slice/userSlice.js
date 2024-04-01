import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userEndPoints } from "../../api";
import { toast } from "react-hot-toast";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    searchLoading: false,
    sentRequests: [],
    receivedRequests: [],
    userStatus: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserStatus(state, action) {
            state.userStatus = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        setSearchLoading(state, action) {
            state.searchLoading = action.payload;
        },
        setSentRequests(state, action) {
            state.sentRequests = action.payload;
        },
        setReceivedRequests(state, action) {
            state.receivedRequests = action.payload;
        }
    }
})

export const { setUser, setSearchLoading, setSentRequests, setReceivedRequests, setUserStatus } = userSlice.actions;
export default userSlice.reducer;


export const searchUser = (token, query) => {
    return async (dispatch) => {
        dispatch(setSearchLoading(true));
        let results = [];
        try {
            const res = await axios.get(userEndPoints.SEARCH_USER + `/${query}`, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
            if (res?.data?.success) results = res?.data?.results;
        } catch (error) {
            console.log("SEARCH ERROR FROM SLICE", error);
            toast.error(error?.response?.data?.message);
        }
        dispatch(setSearchLoading(false));
        return results;
    }
}


export const editProfile = (token, updates) => {
    return async (dispatch) => {
        const toastId = toast.loading("loading...");
        try {
            const res = await axios.put(userEndPoints.UPDATE_PROFILE, updates, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
            if (res?.data?.success) {
                dispatch(setUser(res?.data?.user));
                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log("UPDATE PROFILE", error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);

    }
}

export const editProfilePic = (token, image) => {
    return async (dispatch) => {
        const toastId = toast.loading("loading...");
        try {
            const res = await axios.put(userEndPoints.UPDATE_PROFILE_PIC, image, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
            if (res?.data?.success) {
                dispatch(setUser(res?.data?.user));
                localStorage.setItem("user", JSON.stringify(res?.data?.user));
                toast.success(res?.data?.message);
            }
        } catch (error) {
            console.log("UPDATE PROFILE PIC", error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export const getUserStatus = (token) => {
    return async (dispatch, getState) => {
        const toastId = toast.loading("loading...");
        try {
            const res = await axios.get(userEndPoints.GET_USER_STATUS, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
            if (res?.data?.success) {
                dispatch(setUserStatus(res?.data?.onlineUsers));
            }
        } catch (error) {
            console.log("GET USER STATUS ERROR", error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}