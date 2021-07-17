module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://far.listen-me.ru/api',
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '431346c9188e00e7aa5203146bbed1ad'),
    },
  },
});
