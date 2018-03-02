var webpack = require('webpack');
path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');


console.log(path.resolve('./'));
module.exports = {
    entry: {
        // "only" prevents reload on syntax errors
        './sdk/dist/websdk-1.4.12': ['./sdk/index', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:3000'],
        // './sdk/dist/websdk-1.1.2': './sdk/src/connection',
        './demo/javascript/dist/demo-1.4.16': ['./demo/javascript/src/entry', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:3000'],
        // './demo/javascript/dist/demo': './demo/javascript/src/entry',
        // WebpackDevServer host and port
        // 'devServerClient': 'webpack-dev-server/client?http://localhost:3000',
        // './webrtc/dist/webrtc-1.4.6': ['./webrtc/src/entry']
    },
    externals: {
        WebIM: 'window.WebIM'
    },
    output: {
        path: path.resolve('./'),
        publicPath: '/',
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
                exclude: /(node_modules|bower_components|dist)/
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
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({url: 'http://localhost:3000'})
    ],
}
;

