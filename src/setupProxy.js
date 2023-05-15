const { createProxyMiddleware } = require('http-proxy-middleware');

// This needs to be .js not .ts to be picked up.
module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8095",
      changeOrigin: true
    })
  );
};
