// module.exports = ({ env }) => ({
//   'io': {
//     enabled: true,
//     config: {
//       IOServerOptions: {
//         cors: {
//           origin: ["http://localhost:3000"],
//           methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//           allowedHeaders: ["Content-Type", "Authorization"],
//           credentials: true
//         }
//       },
//       contentTypes: [
//         {
//           uid: 'api::product.product', // Убедитесь, что uid соответствует вашему типу контента
//           actions: ['create', 'update', 'delete'],
//         },
//       ],
//     },
//   },
// });

// module.exports = ({ env }) => ({
//   // ...
//   io: {
//     enabled: true,
//     config: {
//       // This will listen for all supported events on the article content type
//       contentTypes: ['api::article.article'],
//     },
//   },
//   // ...
// });

module.exports = ({ env }) => ({
  // ...
  io: {
    enabled: true,
    config: {
      contentTypes: ['api::product.product', 'plugin::users-permissions.user'],
      socket: {
        serverOptions: {
          cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
        },
      },
      events: [
        {
          name: 'product.create', // Событие создания записи
          handler: ({ result }) => {
            if (result.model === 'product') {
              strapi.plugins.io.io.emit('product.create', result);
            }
          },
        },
        {
          name: 'product.update', // Событие обновления записи
          handler: ({ result }) => {
            if (result.model === 'product') {
              strapi.plugins.io.io.emit('product.update', result);
            }
          },
        },
        {
          name: 'product.delete', // Событие удаления записи
          handler: ({ result }) => {
            if (result.model === 'product') {
              strapi.plugins.io.io.emit('product.delete', result);
            }
          },
        },
        {
          name: 'user.update', // Событие удаления записи
          handler: ({ result }) => {
            if (result.model === 'user') {
              strapi.plugins.io.io.emit('user.update', result);
            }
          },
        },

      ]
    },
  },
  // ...
});
