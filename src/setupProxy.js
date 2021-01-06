const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/account", {
      target: "http://121.40.176.38:7001/",
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/api", {
      target: "http://121.40.176.38:8088/",
      changeOrigin: true
    })
  );
};