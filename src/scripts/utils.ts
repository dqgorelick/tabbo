'use strict';


import {browser} from 'webextension-polyfill-ts';


class ElementNotFoundError extends Error {}


export const queryOrThrow = (query: string): HTMLElement => {
	const elem: HTMLElement | null = document.querySelector(query);

	if (!elem) {
		throw new ElementNotFoundError(`Query ${query} not found`);
	}

	return elem
};


export const tabs = {
	getCurrent: async (): Promise<browser.tabs.Tab> => {
		return (await browser.tabs.query({active: true, currentWindow: true}))[0];
	},
};
