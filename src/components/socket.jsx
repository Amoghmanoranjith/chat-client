// src/socket.js
import { io } from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_BACKEND_URL;
const socket = io(ENDPOINT, {
  transports: ["websocket"],
  autoConnect: false, // Important to control when it connects
});

export default socket;
