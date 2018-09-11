'use strict';


import {browser} from 'webextension-polyfill-ts';


export const tabs = {
	getCurrent: async (): Promise<browser.tabs.Tab> => {
		return (await browser.tabs.query({active: true, currentWindow: true}))[0];
	},
};
