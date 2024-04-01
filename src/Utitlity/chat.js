export const getSenderImage = (user, chat) => {
    return chat?.users[0]?._id === user?._id ? chat?.users[1]?.image : chat?.users[0]?.image;
}

export const getSenderUsername = (user, chat) => {
    return chat?.users[0]?._id === user?._id ? chat?.users[1]?.username : chat?.users[0]?.username;
}

export const getSenderStatus = (user, chat) => {
    return chat?.users[0]?._id === user?._id ? chat?.users[1]?.status : chat?.users[0]?.status;
}

export const getSenderId = (user, chat) => {
    return chat?.users[0]?._id === user?._id ? chat?.users[1]?._id : chat?.users[0]?._id;
}
