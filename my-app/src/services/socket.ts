import io from "socket.io-client";

const SERVER_URL = 'http://localhost:1337';
const token = localStorage.getItem('accessToken');

const socket = io(SERVER_URL, {
    auth: {
        strategy: 'jwt',
        token: token,
    },
});

export default socket