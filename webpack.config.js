const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const common =  merge([
    {
        entry: {
            index: PATHS.src,
            vendor: [
                'jquery',
                'fullpage.js/dist/jquery.fullpage.js',
                'fullpage.js/dist/jquery.fullpage.css',
                './src/vendor/jquery.bxslider.min',
                './src/vendor/jquery.bxslider.min.css'
            ]
        },
        output: {
            publicPath: '/build/',
            path: PATHS.build,
            filename: '[name].js'
        }
    },

    parts.extractBundles([
        {
            name: 'vendor'
        }
    ]),
	parts.setGlobalVar({
		$: 'jquery',
		jQuery: 'jquery',
		'window.$': 'jquery',
		'window.jQuery': 'jquery'
	})
]);

const development = merge([
    parts.devServer({hotOnly:false}),
    parts.loadCSS(),
    parts.loadImage(),
    parts.loadHTML()
]);

const production = merge([
    parts.lintJS({
        include:PATHS.src,
        exclude: [PATHS.build, path.join(__dirname,'app','vendor')]
    }),
    parts.extractCSS({use: 'css-loader'}),
    parts.loadImage({
        options: {
        	limit: 3000,
            name: 'assets/[path][name].[ext]',
            publicPath: './'
        }
    }),
    parts.clean(PATHS.build)
]);

module.exports = (env) => {
    if(env === 'production'){
        return merge(common, production);
    }

    return merge(common, development);
};
