'use strict';


const path = require('path');


module.exports = {
	clearMocks: true,
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: [
		'/node_modules/',
	],
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json',
		},
	},
	moduleDirectories: [
		path.resolve(__dirname, 'node_modules'),
		path.resolve(__dirname, 'src'),
	],
	moduleFileExtensions: [
		'js',
		'ts',
	],
	roots: [
		path.resolve(__dirname, '.'),
	],
	setupFiles: [
		"jest-webextension-mock"
	],
	testEnvironment: 'jsdom',
	testMatch: [
		'**/?(*.)+(spec|test).ts',
	],
	testPathIgnorePatterns: [
		'node_modules/',
	],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	preset: 'ts-jest',
};
