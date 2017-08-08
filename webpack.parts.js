const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');


exports.lintJS = ({include, exclude} = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                use: 'eslint-loader',
                enforce: 'pre'
            }
        ]
    }
});

exports.devServer = ({hotOnly,host, port} = {}) => ({
    devServer: {
        hotOnly,
        historyApiFallback: true,
        stats: 'errors-only',
        host,
        port
    }
});

exports.loadCSS = ({include, exclude} = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
});

exports.extractCSS = ({include, exclude, use} = {}) => {
    const plugin = new ExtractTextPlugin({
        filename: '[name].css'
    });

    return {
        module: {
            rules: [
                {
                    test:/\.css$/,
                    include,
                    exclude,
                    use: plugin.extract({
                        use,
                        fallback: 'style-loader'
                    })
                }
            ]
        },
        plugins: [
            plugin
        ]
    };
};

exports.loadImage = ({include, exclude, options} = {}) => ({
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif)$/,
                include,
                exclude,
                use: {
                    loader: 'url-loader',
                    options
                }
            }
        ]
    }
});

exports.clean = (path) => ({
    plugins: [
        new CleanPlugin([path])
    ]
});

exports.extractBundles = (bundles) => ({
    plugins: bundles.map((bundle) => (new webpack.optimize.CommonsChunkPlugin(bundle)))
});

exports.setGlobalVar = (vars) => ({
	plugins: [
		new webpack.ProvidePlugin(vars)
	]
});

exports.loadHTML = () => ({
	entry: {
		html: [
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/dev-server',
		]
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'raw-loader'
			}
		]
	},
	plugins: [
		new HTMLPlugin({
			template: './index.html'
		})
	]
});




















