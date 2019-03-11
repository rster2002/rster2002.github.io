const path = require('path');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// const WebpackOnBuildPlugin = require('on-build-webpack');

module.exports = {
	entry: [
		"babel-polyfill",
		"./src/index.js"
	],
	plugins: [
		new VueLoaderPlugin()
	],
	module: {
		rules: [
			{
                // vue-loader config to load `.vue` files or single file components.
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        css: [
							"vue-style-loader",
							{
                            	loader: "css-loader",
                        	}
						]
                    },
                    cacheBusting: true,
                }
            },
			{
				test: /\.css$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" }
				]
			},
			{
				test: /\.stylus$/,
				use: [
					"vue-style-loader",
					"css-loader",
					"stylus-loader"
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
	            test: /\.(png|jp(e*)g|svg)$/,
	            use: [
					{
		                loader: "url-loader"
		            }
				]
	        }
		]
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "./")
	},
	devServer: {
		contentBase: path.join(__dirname, "./"),
		compress: true,
		port: 8886
	},
	resolve: {
		alias: {
			vue: "vue/dist/vue.js"
		}
	}
};
