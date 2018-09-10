'use strict';


import {browser} from 'webextension-polyfill-ts';


export const tab = {
	query: (options) => {
		return new Promise((resolve, reject) => {
			chrome.tabs.query(options, (tabs) => {
				resolve(tabs);
			});
		});
	},

	update: (id, options) => {
		return new Promise((resolve, reject) => {
			chrome.tabs.update(id, options, (tab) => {
				resolve(tab);
			});
		});
	},

	getCurrent: () => {
		return new Promise((resolve, reject) => {
			chrome.tabs.getSelected((tab) => {
				resolve(tab);
			});
		});
	},

	get: (id) => {
		return new Promise((resolve, reject) => {
			chrome.tabs.get(id, resolve);
		});
	},

	create: (options) => {
		return new Promise((resolve, reject) => {
			chrome.tabs.create(options, (newTab) => {
				resolve(newTab);
			});
		});
	},

	screenshot: (id, options) => {
		return new Promise((resolve, reject) => {
			chrome.tabs.captureVisibleTab(id, options, resolve);
		});
	},

	getSelected: () => {
		return new Promise((resolve, reject) => {
			chrome.tabs.getSelected(resolve);
		});
	},

	move: (id, options) => {
		return new Promise((resolve, reject) => {
			chrome.tabs.move(id, options);
			resolve();
		});
	},

	remove: (id) => {
		return new Promise((resolve, reject) => {
			chrome.tabs.remove(id);
			resolve();
		})
	}
};

export const window = {
	getAll: (options) => {
		return new Promise((resolve, reject) => {
			chrome.windows.getAll(options, (windows) => {
				resolve(windows);
			});
		});
	},

	getCurrent: (options) => {
		return new Promise((resolve, reject) => {
			chrome.windows.getCurrent(options, (currentWindow) => {
				resolve(currentWindow);
			});
		});
	},

	create: (options) => {
		return new Promise((resolve, reject) => {
			chrome.windows.create(options, (w) => {
				resolve(w);
			});
		});
	},
};
