import { io } from 'socket.io-client';

const serverURL = process.env.SERVER_URL || 'http://localhost:3000';

export const socket = io(serverURL, { autoConnect: false });

export const SESSION_ID = 'sessionID';

export function addSocketEventListeners() {
  socket.onAny((event, ...args) => {
    console.log(event, ...args);
  });

  socket.on('connect_error', console.error);

  socket.on('session', (sessionID) => {
    localStorage.setItem(SESSION_ID, sessionID);
  });
}

export function removeSocketEventListeners() {
  socket.removeAllListeners();
  socket.offAny();
}

export default socket;
