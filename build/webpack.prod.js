var webpack = require('webpack');
path = require('path');

module.exports = {
    entry: {
        './sdk/dist/websdk-1.1.2': './sdk/src/connection',
        './demo/javascript/dist/demo': './demo/javascript/src/entry',
        // './webrtc/dist/webrtc-1.0.0': './webrtc/src/webrtc',
    },
    output: {
        path: '../',
        publicPath: './',
        filename: '[name].js'
    },
    // devtool: '#eval-cheap-module-source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.svg|woff|eot|ttf$/,
                loader: require.resolve('file-loader') + '?name=[path][name].[ext]'
            }
        ]
    },
    plugins: [
        // new webpack.NoErrorsPlugin(),
        // minifies your code
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
}
;

