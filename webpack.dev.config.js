const config = require('./webpack.config')
const webpack = require('webpack')
config.mode = 'development'
config.devServer = {
	contentBase: './app',
	port: 8777,
	openPage: '',
	proxy: {
		"/api/*": {
			target: "http://localhost:9999/",
			secure: false,
			pathRewrite: { "/api": "/" }
		}
	}
}

config.plugins.push(new webpack.HotModuleReplacementPlugin())

module.exports = config