import { io } from 'socket.io-client';

// Replace 'http://localhost:5000' with the actual server URL in production.
const URL = 'https://chatbreeze-backend.onrender.com/';


export const socket = io(URL);

// You can also listen for 'connect' event here if needed.
socket.on('connect', () => {
  console.log('Connected to server');
});
