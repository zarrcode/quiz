import { io } from 'socket.io-client';

const serverURL = process.env.SERVER_URL || 'http://localhost:3005';

// set up socket without connecting
export const socket = io(serverURL, { autoConnect: false });

export default socket;
