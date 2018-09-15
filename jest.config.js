const path = require('path');


module.exports = {
	roots: [
		path.resolve(__dirname, 'src'),
	],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	moduleFileExtensions: [
		'ts',
		'tsx',
		'js',
		'jsx',
		'json',
	],
};
