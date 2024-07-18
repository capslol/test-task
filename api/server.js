const http = require('http');
const strapi = require('strapi');
const socketIO = require('socket.io');
const cors = require('@koa/cors');

// Инициализация Strapi
const strapiServer = strapi({ dir: __dirname });

// Создание HTTP сервера с использованием Strapi
const server = http.createServer(strapiServer);

// Инициализация Socket.IO
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000', // Укажите ваш фронтенд URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'], // Добавьте нужные вам заголовки
    credentials: true // Разрешить отправку куки и заголовков авторизации
  }
});

// Логика обработки WebSocket соединений
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Пример отправки сообщения обратно клиенту
  socket.on('messageFromClient', (message) => {
    console.log('Received message from client:', message);
    socket.emit('messageFromServer', 'Message received!');
  });
});

// Использование Koa middleware для CORS
strapiServer.app.use(cors({
  origin: 'http://localhost:3000', // Укажите ваш фронтенд URL
  credentials: true // Разрешить отправку куки и заголовков авторизации
}));

// Запуск сервера
server.listen(1337, () => {
  console.log('Server running at http://localhost:1337');
});
