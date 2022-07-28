const path = require("path");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyPlugin = require("copy-webpack-plugin");


const devMode = process.env.NODE_ENV !== "production";

const getOptimizations = () => {
    const config = {
        splitChunks: {
        	chunks: "all",
        }
    }

    if (!devMode) {
        config.minimizer = [
            `...`, 
            new CssMinimizerPlugin(), 
            new TerserPlugin()
        ]
        config.minimize = true
    }

    return config;
}

const getPlugins = () => {
    const plugins = [
		new HTMLWebpackPlugin({
			template: "./index.html",
		}),
		new MiniCssExtractPlugin({
			linkType: "text/css",
			filename: "[name].[contenthash].css",
		}),
        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, "src", "assets", "*"),
                    to: path.resolve(__dirname, "dist"),
                    context: path.resolve(__dirname, "src"),
                }
            ]
        }),
		new CleanWebpackPlugin(),
	]

    if (!devMode) {
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins;
}

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: {
		main: [
            "@babel/polyfill", 
            "./index.ts"
        ],
	},
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
        extensions: ['.ts', '.js', '.json'],
		alias: {
            "@scripts": path.resolve(__dirname, "src/scripts"),
            "@styles": path.resolve(__dirname, "src/styles"),
            "@assets": path.resolve(__dirname, "src/assets"),
			"@": path.resolve(__dirname, "src")
		},
	},
	devServer: {
		port: 4200,
		hot: devMode,
	},
	module: {
		rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
			{
				test: /\.css$/i,
				use: [
                    MiniCssExtractPlugin.loader, 
                    "css-loader"
                ],
			},
            {
                test: /\.(png|jpe?g|gif|ico?n)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name][contenthash].[ext]',
                },
            },
            {
                test:    /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
		],
	},
	optimization: getOptimizations(),
	plugins: getPlugins(),
    devtool: devMode ? 'source-map' : undefined,
};
