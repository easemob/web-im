var path = require('path')
var webpack = require('karma-webpack');
var webpackConfig = require('./build/webpack.dev.js');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// Webpack/Karma:  webpack依赖，karma不依赖 reason?
// delete webpackConfig.resolve.alias['react/lib']
// delete webpackConfig.resolve.alias['react']
// delete webpackConfig.resolve.alias['react-dom']

webpackConfig.module.loaders.push({
    test: /\.json$/,
    loader: 'json',
});

webpackConfig.module.noParse = [
    'webim.config.js'
];


// webpackConfig.module.postLoaders = [{
//     test: /\.(js|jsx)$/, exclude: /(node_modules|bower_components|tests)/,
//     loader: 'istanbul-instrumenter'
// }];

// Enzyme with Karma : https://github.com/airbnb/enzyme/blob/master/docs/guides/karma.md
webpackConfig.externals = {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    WebIM: 'window.WebIM'
    // 'react-addons-test-utils': true,W
}

//  Karma : 不支持 CommonsChunkPlugin
webpackConfig.plugins = [
    new FriendlyErrorsWebpackPlugin(),
]
//TODO: use cmd to switch interface and functional test
// FILE=xxx FILE2=yyy npm run test
// console.log(process.env.FILE, process.env.FILE2)
// output: xxx yyy

// webpackConfig.devtool = 'inline-sourcemap'
webpackConfig.devtool = 'cheap-module-source-map'

module.exports = function (config) {
    config.set({
        // 依赖框架
        frameworks: ['jasmine'],
        files: [
            {
                pattern: './demo/javascript/dist/browser-polyfill.min.js',
                included: true,
            },
            {
                pattern: './demo/javascript/dist/webim.config.js',
                included: true,
            },
            {
                pattern: './sdk/dist/strophe-1.2.8.js',
                included: true,
            },

            {
                pattern: './demo/images/**/*.*',
                included: false,
                served: true,
            },
            // {
            //     pattern: './demo/javascript/dist/debug.js',
            //     included: true,
            // },
            //
            // {
            //     pattern: './web/styles/css/*\.css',
            //     included: true,
            //     served: false,
            // },
            //
            // {
            //     pattern: './web/build/*.js',
            //     included: false,
            //     served: true,
            // },
            // './web/build/vendor.ui.js',
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            // './demo/javascript/dist/browser-polyfill.min.js',
            // './demo/javascript/dist/webim.config.js',
            // './sdk/dist/strophe-1.2.8.js',
            // './demo/javascript/dist/debug.js',
            // './sdk/dist/websdk-1.4.10.js',
            // './demo/javascript/dist/swfupload/swfupload.min.js',
            // './demo/javascript/dist/demo-1.4.10.js',
            '__test__/setup.js',
            '__test__/interface.test.js'  //接口测试
            // '__test__/flow.test.js'          //e2e测试
        ],
        proxies: {
            "/demo/": "/base/demo/",
        },
        // karma support for webpack / jasmine
        plugins: [
            webpack,
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            // 'karma-coverage',
            'karma-spec-reporter',
            'karma-coverage-istanbul-reporter'
        ],
        // 测试使用的浏览器 Chrome
        browsers: ['Chrome'],
        // browsers: ['PhantomJS'],
        // 预编译操作，类似webpack的entry
        preprocessors: {
            '__test__/setup.js': ['webpack'],
            '__test__/*.test.js': ['webpack'],
            'demo/javascript/src/**/*.js': ['webpack']
        },
        // reporters: ['spec', 'coverage'],
        // reporters: ['spec', 'coverage-istanbul'],
        reporters: ['spec'],

        // specReporter: {
        //     maxLogLines: 5,             // limit number of lines logged per test
        //     suppressErrorSummary: true, // do not print error summary
        //     suppressFailed: false,      // do not print information about failed tests
        //     suppressPassed: false,      // do not print information about passed tests
        //     suppressSkipped: true,      // do not print information about skipped tests
        //     showSpecTiming: false,      // print the time elapsed for each spec
        //     failFast: false              // test would finish with error when a first fail occurs.
        // },

        // coverageReporter: {
        //     dir: 'build/reports/coverage',
        //     reporters: [
        //         {type: 'html', subdir: 'report-html'},
        //         {type: 'lcov', subdir: 'report-lcov'},
        //         {type: 'cobertura', subdir: '.', file: 'cobertura.txt'}
        //     ],
        // },
        //
        // coverageIstanbulReporter: {
        //     // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib
        //     reports: ['html', 'lcovonly', 'text-summary'],
        //
        //     // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
        //     dir: path.join(__dirname, 'coverage'),
        //
        //     // if using webpack and pre-loaders, work around webpack breaking the source path
        //     fixWebpackSourcePaths: true,
        //
        //     // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
        //     skipFilesWithNoCoverage: true,
        //
        //     // Most reporters accept additional config options. You can pass these through the `report-config` option
        //     'report-config': {
        //
        //         // all options available at: https://github.com/istanbuljs/istanbul-reports/blob/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib/html/index.js#L135-L137
        //         html: {
        //             // outputs the report in ./coverage/html
        //             subdir: 'html'
        //         }
        //
        //     },
        //
        //     // enforce percentage thresholds
        //     // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
        //     thresholds: {
        //         global: { // thresholds for all files
        //             statements: 70,
        //             lines: 70,
        //             branches: 70,
        //             functions: 70
        //         },
        //         // each: { // thresholds per file
        //         //     statements: 10,
        //         //     lines: 10,
        //         //     branches: 10,
        //         //     functions: 10
        //         // }
        //     }
        // },

        //  webpack 相关支持
        webpack: webpackConfig,
        webpackMiddleware: {noInfo: true, quiet: true}
    });
}
