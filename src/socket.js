import { io } from "socket.io-client";


export const socket = io("https://lets-talk-server-wc3b.onrender.com", {
    autoConnect: false,
});
