var webpackMerge = require('webpack-merge'),
    path = require('path'),
    webpack = require('webpack')        
    ;

var common = {
    devServer: {
        stats: 'errors-only',
    },
    resolve: {
        extensions: ['', '.ts','.js']
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "raw" },         
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: ['node_modules'],
                query: {
                    ignoreDiagnostics: [
                        2403, // 2403 -> Subsequent variable declarations
                        2300, // 2300 -> Duplicate identifier
                        2374, // 2374 -> Duplicate number index signature
                        2375, // 2375 -> Duplicate string index signature
                    ]
                },
            }
        ],
    }
};

var app_config = {
    target: 'web',
    entry: {
        app: ['./client/bootstrap.ts'],       
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js",
        pathinfo: false,
        publicPath: '/build',
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            sourceType: 'var',
            get manifest() {
                return require(path.join(__dirname, "build", "vendors-manifest.json"));
            }
        })
    ]
};

var vendors_config = {
    target: 'web',
    entry: {
        vendors: [
            "es6-shim",
            "es6-promise",
            "reflect-metadata",
            "zone.js/dist/zone-microtask",
            "zone.js/dist/long-stack-trace-zone",
            "rxjs",
            "angular2/core",
            "angular2/router",
            "angular2/common",
            "angular2/http"            
        ]
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js",
        library: "vendors",
        libraryTarget: 'var'
    },

    plugins: [
        new webpack.DllPlugin({
            name: "vendors",
            path: path.join(__dirname, "build", "vendors-manifest.json"),
        })
    ]
};

module.exports = function (env) {
    var environment = env || process.env.NODE_ENV || "development";
    var productionTools = {
        plugins: [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                mangle: false,
                compress: {
                    warnings: false
                }
            })
        ]
    }
    var devTools = {
        devtool: "source-map",
        debug: true,
        plugins: [new webpack.HotModuleReplacementPlugin()]
    }

    var client, vendors;
    if (environment === 'development') {
        client = webpackMerge(common, app_config, devTools);
        vendors = webpackMerge(common, vendors_config, {/*dev specific config */ });
    }
    if (environment === 'production') {
        client = webpackMerge(common, app_config, Object.assign({}, productionTools));
        vendors = webpackMerge(common, vendors_config, Object.assign({}, productionTools));
    }   

    return {
        client: client,
        vendors: vendors       
    }
}