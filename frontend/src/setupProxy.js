const proxy = require('http-proxy-middleware');

const apiProxy = proxy('/api', {
  target: 'http://localhost:5000',
  logLevel: 'debug',
  changeOrigin: true,
  pathRewrite: function (path, req) {
    return req.originalUrl.replace('/api/', '/');
  }
})

const wsProxy = proxy('/socket.io', {target:'http://localhost:3003', ws: true})

const oauth2Proxy = proxy('/oauth2', {target:'http://localhost:5000'})

module.exports = function (app) {
  app.use(apiProxy, wsProxy, oauth2Proxy);
};
