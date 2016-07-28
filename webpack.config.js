var webpack = require('webpack'); 
module.exports = {
    entry: {
        './sdk/dist/websdk-1.1.2': './sdk/src/connection',
        './demo/javascript/dist/demo': './demo/javascript/src/entry'
    },
    output: {
        path: './',
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
					presets: ['es2015', 'stage-2', 'react']
				}
			}
        ]
    }
}
