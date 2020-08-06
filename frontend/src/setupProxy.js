const proxy = require('http-proxy-middleware');

const apiProxy = proxy('/api', {
  target: 'http://localhost:5000',
  logLevel: 'debug',
  changeOrigin: true,
  pathRewrite: function (path, req) {
    console.log('api');
    return req.originalUrl.replace('/api/', '/');
  }
})

module.exports = function (app) {
  console.log('modeules');
  app.use(apiProxy);
};
