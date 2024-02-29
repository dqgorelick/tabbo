'use strict';

import * as logging from '../logging';
import * as tabbo from '../tabbo';
import * as utils from '../utils';

import browser from 'webextension-polyfill';


export const moveTab = async (direction: tabbo.Direction): Promise<void> => {
	const tabs: browser.tabs.Tab[] = await browser.tabs.query({currentWindow: true});
	const pinnedTabs: browser.tabs.Tab[] = tabs.filter(
		(e: browser.tabs.Tab): boolean => e.pinned
	);
	/*
	 *const unpinnedTabs: browser.tabs.Tab[] = tabs.filter(
	 *    (e: browser.tabs.Tab): boolean => !e.pinned
	 *);
	 *const highlightedTabs: browser.tabs.Tab[] = tabs.filter(
	 *    (e: browser.tabs.Tab): boolean => e.highlighted
	 *);
	 *const nonHighlightedTabs: browser.tabs.Tab[] = tabs.filter(
	 *    (e: browser.tabs.Tab): boolean => !e.highlighted
	 *);
	 */

	const tab: browser.tabs.Tab = await utils.tabs.getCurrent();

	const currentIndex: number = tab.index;
	let newIndex: number = 0;
	let lowerBound: number = 0;
	let upperBound: number = 0;

	if (tab.pinned) {
		lowerBound = 0;
		upperBound = pinnedTabs.length - 1;
	} else {
		lowerBound = pinnedTabs.length;
		upperBound = tabs.length - 1;
	}

	if (direction === tabbo.Direction.LEFT) {
		newIndex = (currentIndex === lowerBound) ? upperBound : currentIndex - 1;
	} else {
		newIndex = (currentIndex === upperBound) ? lowerBound : currentIndex + 1;
	}


	try {
		await browser.tabs.move(tab.id, {index: newIndex});
	} catch (e) {
		logging.error(e.message);
	}
};


export const popTab = async (): Promise<void> => {
	const w: browser.windows.Window = await browser.windows.getCurrent({populate:true});

	if (w.tabs && w.tabs.length !== 1) {
		const t: browser.tabs.Tab = await utils.tabs.getCurrent();

		browser.windows.create({tabId: t.id}).catch((e: Error): void => {
			logging.error(e.message);
		});

		browser.tabs.update(t.id, {pinned: t.pinned}).catch((e: Error): void => {
			logging.error(e.message);
		});
	}
};


export const pushTab = async (): Promise<void> => {
	const windows: browser.windows.Window[] = await browser.windows.getAll({populate: true});

	// Just in case number of windows goes below 1
	if (windows.length <= 1) {
		return;
	} else if (windows.length === 2) {
		const tab: browser.tabs.Tab = await utils.tabs.getCurrent();

		const otherWindow: browser.windows.Window[] = windows.filter(
			(w: browser.windows.Window): boolean => w.id !== tab.windowId
		);

		browser.tabs.move(tab.id, {windowId: otherWindow[0].id, index: -1}).catch(
			(e: Error): void => {
				logging.error(e.message);
			}
		);

		browser.windows.update(otherWindow[0].id, {focused: true}).catch(
			(e: Error): void => {
				logging.error(e.message);
			}
		);

		browser.tabs.update(tab.id, {active: true, pinned: tab.pinned}).catch(
			(e: Error): void => {
				logging.error(e.message);
			}
		);
	} else {
		const tab: browser.tabs.Tab = await utils.tabs.getCurrent();
		const newTab: browser.tabs.Tab = await browser.tabs.create(
			{
				url : `../manager.html#${tab.id}`
			}
		);

		const onTabChange: tabbo.TabsOnActivatedCallback = async (e: tabbo.TabsOnActivatedEvent) => {
			if (e.tabId !== newTab.id) {
				browser.tabs.onActivated.removeListener(onTabChange);

				browser.tabs.get(newTab.id).catch((e: Error): void => {
					logging.error(e.message);
				});

				if (!browser.runtime.lastError) {
					browser.tabs.remove(newTab.id).catch((e: Error): void => {
						logging.error(e.message);
					});
				}
			}
		};

		browser.tabs.onActivated.addListener(onTabChange);
	}
};


export const explodeWindow = async (): Promise<void> => {
	const windows: browser.windows.Window[] = await browser.windows.getAll({populate: true});

	windows.forEach((w: browser.windows.Window): void => {
		if (!w.tabs) {
			return;
		}

		w.tabs.forEach((t: browser.tabs.Tab): void => {
			const width: number = Math.floor(Math.random() * (screen.width * 0.75) + 1);
			const height: number = Math.floor(Math.random() * (screen.height * 0.75) + 1);
			const left: number = Math.floor(Math.random() * (screen.width - width) + 1);
			const top: number = Math.floor(Math.random() * (screen.height - height) + 1);

			browser.windows.create({
				tabId: t.id,
				width,
				height,
				left,
				top,
			}).catch((e: Error): void => {
				logging.error(e.message);
			});
		});
	});
};


export const gatherWindow = async (): Promise<void> => {
	const windows: browser.windows.Window[] = await browser.windows.getAll({populate: true});

	let isFirstWindow: boolean = true;
	let firstWindowId: number | undefined;

	windows.forEach((w: browser.windows.Window): void => {
		if (isFirstWindow) {
			isFirstWindow = false;
			firstWindowId = w.id;
		} else {
			if (!w.tabs) {
				return;
			}

			w.tabs.forEach((t: browser.tabs.Tab): void => {
				browser.tabs.move(
					t.id,
					{windowId: firstWindowId, index: -1},
				).catch((e: Error): void => {
					logging.error(e.message);
				});
			});
		}
	});
};
