const proxy = require('http-proxy-middleware');

const apiProxy = proxy('/api', {
  target: 'http://localhost:5000',
  logLevel: 'debug',
  changeOrigin: true,
  pathRewrite: function (path, req) {
    return req.originalUrl.replace('/api/', '/');
  }
})

const wsProxy = proxy('/ws', {target:'http://localhost:5000', ws: true})

module.exports = function (app) {
  app.use(apiProxy, wsProxy);
};
