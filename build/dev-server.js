var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    // contentBase: ['./demo', './sdk'],
    hot: true,
    inline: false,
    progress: true,
    compress: true,
    historyApiFallback: true,
    stats: {
        chunks: false,
        children: false,
        colors: true
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: true,
    }
    // headers: { 'Access-Control-Allow-Origin': '*' }
}).listen(3000, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://localhost:3000/');
});