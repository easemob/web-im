var webpack = require('webpack');

module.exports = {
    entry: {
        './sdk/dist/websdk-1.1.2': './sdk/src/connection',
        './demo/javascript/dist/demo': './demo/javascript/src/entry',
        './webrtc/dist/webrtc-1.0.0': './webrtc/src/webrtc'
    },
    output: {
        path: './',
        publicPath: './',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    // to avoid:
    // Warning: It looks like you're using a minified copy of the development build of React ...
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
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
    }
};

