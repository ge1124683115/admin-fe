const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
   entry: './src/app.jsx',
   output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: "/dist/",
      filename: 'js/app.js'
   },
   resolve: {
      alias: {
         page      : path.resolve(__dirname, "src/page"),
         component : path.resolve(__dirname, "src/component"),
         util      : path.resolve(__dirname,'src/util'),
         service   : path.resolve(__dirname,'src/service')
      }
   },
   module: {
      rules: [
         {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
               fallback: "style-loader",
               use: "css-loader"
            })
         },
         {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
               use: ['css-loader', 'sass-loader']
            })
         },
         {
            test: /\.(png|jpg|gif)$/,
            use: [
               {
                  loader: 'url-loader',
                  options: {
                     limit: 8192,
                     name: 'resource/[name].[ext]'
                  }
               }
            ]
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            use: [
               {
                  loader: 'url-loader',
                  options: {
                     limit: 8192,
                     name: 'resource/[name].[ext]'
                  }
               }
            ]
         },
         {
            test: /\.jsx$/,
            exclude: /(node_modules)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['env','react']
               }
            }
         }
      ]
   },
   plugins: [
      //处理html文件
      new HtmlWebpackPlugin({
         template: './src/index.html',
         favicon: './favicon.ico'
      }),
      //打包css文件
      new ExtractTextPlugin("css/[name].css"),
      //提取公共模块
      new webpack.optimize.CommonsChunkPlugin({
         name : 'common',
         filename:'js/base.js'
      })
   ],
   devServer: {
      port : 8088,
      historyApiFallback : {
         index : '/dist/index.html'
      },
      proxy : {
         '/manage' : {
            target : 'http://admintest.happymmall.com',
            changeOrigin : true
         },
         '/user/logout.do' : {
            target : 'http://admintest.happymmall.com',
            changeOrigin : true
         }
      }
   }
};