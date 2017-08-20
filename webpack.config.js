/*
* @Author: jsw
* @Date:   2017-08-14 16:34:43
* @Last Modified by:   jsw
* @Last Modified time: 2017-08-14 16:34:43
*/

'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
    return{
        template: './src/view/'+ name +'.html',
        filename: 'view/'+ name +'.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}
//webpack config
var config = {
    entry: {
    	'index' : ['./src/page/index/index.js'],
    	'login' : ['./src/page/login/index.js'],
        'common' : ['./src/page/common/index.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:  ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|jpg|gif|woff|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }  
                    }
                ]
            }
        ]
    },
    externals: {
    	'jquery' : 'window.jQuery'
    },
    plugins: [
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin('css/[name].css'),
        //html模版的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};

module.exports = config