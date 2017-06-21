window.utils = {
	tabQuery: (options) => {
		return new Promise((resolve, reject) => {
			chrome.tabs.query(options, (tabs) => {
				resolve(tabs);
			});
		});
	},
	getCurrentTab: () => {
		return new Promise((resolve, reject) => {
			chrome.tabs.getSelected((tab) => {
				resolve(tab);
			});
		});
	},
	getTab: (id) => {
		return new Promise((resolve, reject) => {
			chrome.tabs.get(id, resolve);
		});
	},
	getAllWindows: (options) => {
		return new Promise((resolve, reject) => {
			chrome.windows.getAll(options, (windows) => {
				resolve(windows);
			});
		});
	},
	getCurrentWindow: (options) => {
		return new Promise((resolve, reject) => {
			chrome.windows.getCurrent(options, (currentWindow) => {
				resolve(currentWindow);
			});
		});
	},
	createTab: (options) => {
		return new Promise((resolve, reject) => {
			chrome.tabs.create(options, (newTab) => {
				resolve(newTab);
			});
		});
	},
	screenshotTab: (id, options) => {
		return new Promise((resolve, reject) => {
			chrome.tabs.captureVisibleTab(id, options, resolve);
		});
	},
	getSelectedTab: () => {
		return new Promise((resolve, reject) => {
			chrome.tabs.getSelected(resolve);
		});
	}
};
