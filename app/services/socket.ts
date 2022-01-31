import { io } from 'socket.io-client';

const serverURL = process.env.SERVER_URL || 'http://localhost:3000';

export const socket = io(serverURL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, ...args);
});

export default socket;
