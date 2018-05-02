var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')
var APP_PATH = path.resolve(__dirname, 'app');
var SRC_PATH = path.resolve(__dirname, 'src');
module.exports = {
	entry: {
		index: './src/App.tsx',
		vender: ['react', 'react-dom', 'antd']
	},
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					getCustomTransformers: () => ({
						before: [tsImportPluginFactory({ libraryName: "antd", style: "css" })]
					})
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.(jpg|png|gif|svg)$/,
				loader: 'url-loader',
				query: {
					limit: 8192,
					name: 'res/img/[name].[ext]'
				}
			},
			{
				test: /\.(ttf|woff|eot)$/,
				loader: 'url-loader',
				query: {
					limit: 8192,
					name: 'res/font/[name].[ext]'
				}
			}
		]
	},
	resolve: {
		alias: {
			__module: path.join(__dirname, 'src', 'module'),
			__public: path.join(__dirname, 'src', 'public'),
			__res: path.join(__dirname, 'src', 'res'),
			__config: path.join(__dirname, 'src', 'config'),
			__utils: path.join(__dirname, 'src', 'utils')
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/src/index.html",
			filename: 'index.html'
		}),
		new webpack.optimize.SplitChunksPlugin({
			chunks: "initial", // 必须三选一： "initial" | "all"(默认就是all) | "async"
			minSize: 0, // 最小尺寸，默认0
			minChunks: 1, // 最小 chunk ，默认1
			maxAsyncRequests: 1, // 最大异步请求数， 默认1
			maxInitialRequests: 1, // 最大初始化请求书，默认1
			name: function () {
			}, // 名称，此选项可接收 function
			cacheGroups: { // 这里开始设置缓存的 chunks
				priority: 0, // 缓存组优先级
				vendor: { // key 为entry中定义的 入口名称
					chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
					name: "vendor", // 要缓存的 分隔出来的 chunk 名称
					minSize: 0,
					minChunks: 1,
					enforce: true,
					maxAsyncRequests: 1, // 最大异步请求数， 默认1
					maxInitialRequests: 1, // 最大初始化请求书，默认1
					reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
				}
			}
		})
	]
}