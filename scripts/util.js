'use strict';

// deprecated
window.util = {
	tabs: {
		getCurrent: async () => {
			return (await browser.tabs.query({active: true, currentWindow: true}))[0];
		}
	}
};
