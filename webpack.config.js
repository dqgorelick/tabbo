const path = require('path');


module.exports = {
	mode: 'development',
	entry: {
		index: './scripts/index.ts',
		popup: './scripts/popup.ts',
		background: './scripts/background.ts',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				include: [
					path.resolve(__dirname, 'scripts'),
					path.resolve(__dirname, 'node_modules')
				],
				exclude: [
					/\.spec\.ts$/,
					/archive/
				],
				loader: 'ts-loader',
			}
		]
	},
	resolve: {
		modules: [
			path.resolve(__dirname, 'node_modules'),
			path.resolve(__dirname, 'scripts')
		],
		extensions: ['.js', '.ts']
	},
	devtool: 'inline-source-map',
	context: path.resolve(__dirname),
	target: 'web',
	stats: {
		assets: true,
		colors: true,
		errors: true,
		errorDetails: true,
		hash: true
	},
	cache: true
};
