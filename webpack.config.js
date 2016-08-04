var webpack = require('webpack');

module.exports = {
    entry: {
        './sdk/dist/websdk-1.1.2': './sdk/src/connection',
        './demo/javascript/dist/demo': './demo/javascript/src/entry'
    },
    output: {
        path: './',
        publicPath: './',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
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
}
