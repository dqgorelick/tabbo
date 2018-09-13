const path = require('path');


module.exports = {
	mode: 'development',
	entry: {
		background: path.resolve(__dirname, 'src/scripts/background/index.ts'),
		manager: path.resolve(__dirname, 'src/scripts/manager/index.ts'),
		popup: path.resolve(__dirname, 'src/scripts/popup/index.ts'),
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				include: [
					path.resolve(__dirname, 'src/scripts'),
					path.resolve(__dirname, 'node_modules')
				],
				exclude: [
					/\.spec\.ts$/,
				],
				loader: 'ts-loader',
			}
		]
	},
	resolve: {
		modules: [
			path.resolve(__dirname, 'node_modules'),
			path.resolve(__dirname, 'src/scripts')
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
