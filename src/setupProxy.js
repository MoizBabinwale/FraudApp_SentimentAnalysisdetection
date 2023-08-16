const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/model', // the route you'll use to proxy the model
        createProxyMiddleware({
            target: 'https://tfhub.dev', // the actual URL of the model
            changeOrigin: true,
            secure: false, // for development purposes only
        })
    );
};
