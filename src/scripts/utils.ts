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


export enum Browser {
	OTHER = "OTHER",
	FIREFOX = "FIREFOX",
	CHROME = "CHROME",
};


export const checkBrowser = (): Browser => {
	if (navigator.userAgent.search('Chrome') > -1) {
		return Browser.CHROME;
	} else if (navigator.userAgent.search('Firefox') > -1) {
		return Browser.FIREFOX;
	}

	return Browser.OTHER;
};
