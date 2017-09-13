var path=require('path');
var webpack=require('webpack');
var HtmlWebpackPlugin=require('html-webpack-plugin');
var CompressionWebpackPlugin = require('compression-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')
var APP_PATH = path.resolve(__dirname, 'app');
var SRC_PATH = path.resolve(__dirname, 'src');
module.exports={
	entry:['./src/App.tsx'],
	output:{
		path:path.resolve(__dirname,'app'),
		// publicPath:'./',
		filename:'[name].js'
	},
	module:{
		rules:[
			{
				test:/\.(ts|tsx|js|jsx)$/,
                exclude:/node_modules/,
                loader:'ts-loader',
                options:{
                    getCustomTransformers: () => ({
                      before: [ tsImportPluginFactory({ libraryName: "antd", style: "css" }) ]
                    })
                  }
			},
			{
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.(jpg|png|gif|svg)$/,
				loader:'url-loader',
				query:{
					limit:8192,
					name:'res/img/[name].[ext]'
				}
			},
			{
				test:/\.(ttf|woff|eot)$/,
				loader:'url-loader',
				query:{
					limit:8192,
					name:'res/font/[name].[ext]'
				}
			}
		]
	},
	resolve:{
		alias:{
			__module:path.join(__dirname,'src','module'),
			__public:path.join(__dirname,'src','public'),
			__res:path.join(__dirname,'src','res'),
			__config:path.join(__dirname,'src','config'),
			__utils:path.join(__dirname,'src','utils')
        },
        extensions:['.ts','.tsx','.js','.jsx','.json']
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:__dirname+"/src/index.html",
            filename:'index.html'
		}),
		// 生产环境打包
		new webpack.DefinePlugin({
			"process.env":{
				NODE_ENV:JSON.stringify('production')
			}
		}),
		// 去掉注释，忽略警告
		new webpack.optimize.UglifyJsPlugin({
			comments:false,
			compress:{
				warnings:false
			}
		}),
		new CompressionWebpackPlugin({ //gzip 压缩
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp(
				'\\.(js|css)$'    //压缩 js 与 css
			),
			threshold: 10240,
			minRatio: 0.8
		}),
		//css单独打包
		new ExtractTextPlugin("[name].[contenthash].css")
	]
}