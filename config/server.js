module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('URL', ''),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '431346c9188e00e7aa5203146bbed1ad'),
    },
  },
});
