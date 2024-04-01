const BASE_URL = "https://lets-talk-server-wc3b.onrender.com";

export const authEndpoints = {
    LOGIN: BASE_URL + "/api/auth/login",
    SIGNUP: BASE_URL + "/api/auth/signup",
    SEND_OTP: BASE_URL + '/api/auth/sendOtp',
    CHANGE_PASS: BASE_URL + "/api/auth/change-password",
    RESET_PASSWORD_TOKEN: BASE_URL + "/api/auth/reset-password-token",
    RESET_PASSWORD: BASE_URL + "/api/auth/reset-password",
}

export const chatEndPoints = {
    FETCH_ALL_CHATS: BASE_URL + "/api/chat/fetchAllChats",
    CREATE_SINGLE_CHAT: BASE_URL + "/api/chat/create-single-chat",
    CREATE_GROUP_CHAT: BASE_URL + "/api/chat/create-group-chat",
    EDIT_GROUP_CHAT: BASE_URL + '/api/chat/edit-group-details',
    REMOVE_GROUP_CHAT: BASE_URL + '/api/chat/remove-group-chat',
}

export const userEndPoints = {
    SEARCH_USER : BASE_URL + "/api/users/search",
    UPDATE_PROFILE: BASE_URL + "/api/users/updateProfile",
    UPDATE_PROFILE_PIC: BASE_URL + "/api/users/updateProfilePic",
    GET_USER_STATUS: BASE_URL + "/api/users/getUserStatus",
}

export const messageEndPoints = {
    GET_CHAT_MESSAGES: BASE_URL + "/api/message/getChatMessages",
    SEND_MESSAGE: BASE_URL + "/api/message/sendMessage",
}
