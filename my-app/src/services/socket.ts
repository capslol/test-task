import { io } from 'socket.io-client';

const socket = io('http://localhost:1337'); // Замени на свой адрес

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('message', (data) => {
    console.log('message received: ', data);
});

export default socket;