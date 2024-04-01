import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Slice/userSlice';
import chatSlice from "./Slice/chatSlice";
import authSlice from "./Slice/authSlice";
import messageSlice from "./Slice/messageSlice";
import themeSlice from "./Slice/themeSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        chat: chatSlice,
        message: messageSlice,
        themes: themeSlice,
    }
});

export default store;