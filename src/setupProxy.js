const {createProxyMiddleware} = require('http-proxy-middleware');


module.exports = function (app) {
  app.use(createProxyMiddleware(['/upms', '/auth', '/api','/file'], {
	target: 'http://localhost:9000'
  }));
  app.use(createProxyMiddleware(['/group1'], {
	target: 'http://192.168.5.108:6888'
  }));
};
