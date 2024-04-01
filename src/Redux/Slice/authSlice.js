import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authEndpoints } from "../../api";
import { toast } from "react-hot-toast";
import { setUser } from "./userSlice";
import { socket } from "../../socket";

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).token : null,
    signupData: [],
}

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        setSignupData(state, action) {
            state.signupData = action.payload;
        },
    }
})

export const { setToken, setSignupData, } = authSlice.actions;
export default authSlice.reducer;

export const login = (email, password, navigate) => {
    return async (dispatch, getState) => {
        const toastId = toast.loading("Loading...");
        try {
            const res = await axios.post(authEndpoints.LOGIN, { email, password });
            if (!res?.data?.success) {
                toast.error(res?.data?.message);
                toast.dismiss(toastId);
                return;
            }
            dispatch(setUser(res?.data?.user));
            dispatch(setToken(res?.data?.token));
            localStorage.setItem("user", JSON.stringify({ ...res?.data?.user, timeOfCreation: Date.now() }));
            localStorage.setItem("token", JSON.stringify({ token: res?.data?.token, timeOfCreation: Date.now() }));
            toast.success(res?.data?.message);
            navigate("/");
        } catch (error) {
            console.log("LOGIN ERROR", error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export const sendOtp = (email, navigate) => {
    return async (dispatch, getState) => {
        const toastId = toast.loading("Loading...");
        try {
            console.log(authEndpoints.SEND_OTP, email);
            const res = await axios.post(authEndpoints.SEND_OTP, { email });
            if (!res?.data?.success) {
                toast.error(res?.data?.message);
                toast.dismiss(toastId);
                return;
            }
            toast.success(res?.data?.message);
            navigate("/verify-email");
        } catch (error) {
            console.log("SEND OTP ERROR", error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export const signup = (formData, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const res = await axios.post(authEndpoints.SIGNUP, formData);
            if (!res?.data?.success) {
                toast.error(res?.data?.message);
                toast.dismiss(toastId);
                return;
            }
            toast.success(res?.data?.message);
            navigate("/login");
        } catch (error) {
            console.log("SINGUP ERROR", error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export const sendPasswordResetToken = async (email, setEmailSent) => {
    const toastId = toast.loading("Loading...");
    try {
        const res = await axios.post(authEndpoints.RESET_PASSWORD_TOKEN, { email });
        console.log(res);
        if (!res?.data?.success) {
            toast.error(res?.data?.message);
            toast.dismiss(toastId);
            return;
        }
        toast.success(res?.data?.message);
        setEmailSent(true);

    } catch (error) {
        console.log("RESET PASSWORD TOKEN ERROR", error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
}

export const resetPassword = async (password, confirmPassword, token, navigate) => {
    const toastId = toast.loading("Loading...");
    try {
        const res = await axios.post(authEndpoints.RESET_PASSWORD, { password, confirmPassword, token });
        console.log(res);
        if (!res?.data?.success) {
            toast.error(res?.data?.message);
            toast.dismiss(toastId);
            return;
        }
        toast.success(res?.data?.message);
        navigate("/login");
    } catch (error) {
        console.log("RESET PASSWORD ERROR", error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
}

export function logout(navigate) {
    return (dispatch) => {
        socket.disconnect();
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/login")
    }
}

