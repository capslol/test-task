module.exports = ({ env }) => ({
  'io': {
    enabled: true,
    config: {
      IOServerOptions: {
        cors: {
          origin: ["http://localhost:3000"],
          methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
          allowedHeaders: ["Content-Type", "Authorization"],
          credentials: true
        }
      },
      contentTypes: [
        {
          uid: 'api::product.product', // Убедитесь, что uid соответствует вашему типу контента
          actions: ['create', 'update', 'delete'],
        },
      ],
    },
  },
});
