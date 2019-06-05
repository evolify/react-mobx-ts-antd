const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = () => {
  const prod = process.env.NODE_ENV === 'production'
  const styleLoader = loaders => [
    prod ? MiniCssExtractPlugin.loader : 'style-loader',
    ...loaders
  ]

  return {
    mode: prod ? 'production' : 'development',
    devtool: prod ? 'source-map' : 'cheap-module-eval-source-map',
    entry: './src/App.tsx',
    output: {
      path: path.resolve('./app'),
      filename: prod ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      publicPath: '',
    },
    module: {
      rules: [{
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.css$/,
        use: styleLoader(['css-loader'])
      }, {
        test: /\.scss$/,
        use: styleLoader(['css-loader', 'sass-loader'])
      }, {
        test: /\.(jpe?g|png|gif|bmp|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8 * 1024,
            name: prod ? 'img/[name].[contenthash:8].[ext]' : '[name].[ext]',
          },
        }
      }, {
        test: /\.(svg|eot|woff|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: prod ? 'font/[name].[contenthash:8].[ext]' : '[name].[ext]',
          }
        }
      }]
    },
    resolve: {
      modules: ['node_modules', 'src'],
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devServer: {
      contentBase: './app',
      disableHostCheck: true,
      host: '0.0.0.0',
      useLocalIp: true,
      open: 'Google Chrome',
      hot: true,
      publicPath: ''
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html' 
      }),
      new webpack.EnvironmentPlugin({
        ...process.env
      }),
      prod && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css'
      })
    ].filter(Boolean)
  }
}
