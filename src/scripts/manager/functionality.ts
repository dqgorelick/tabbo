'use strict';

import * as utils from '../utils';

import {browser} from 'webextension-polyfill-ts';


export const moveTabToWindow = async (w: browser.windows.Window, t: browser.tabs.Tab): Promise<void> => {
	if (w.id === undefined || t.id === undefined) {
		return;
	}

	await browser.tabs.move(t.id, {windowId: w.id, index: -1});
	await browser.windows.update(w.id, {focused: true});
	await browser.tabs.update(t.id, {active: true, pinned: t.pinned});
};


export const main = async (sendTabID: number): Promise<void> => {
	const current: browser.windows.Window = await browser.windows.getCurrent();
	const windows: browser.windows.Window[] = (
		await browser.windows.getAll({populate: true})
	).filter((w: browser.windows.Window): boolean => {
		return current.id !== w.id;
	}).sort((a: browser.windows.Window, b: browser.windows.Window): boolean => {
		if (a.id < b.id) {
			return -1;
		} else if (a.id > b.id) {
			return 1;
		}

		return 0;
	});

	const openWindowsElement: HTMLElement = utils.queryOrThrow('#open-windows');
	const t: browser.tabs.Tab = await browser.tabs.get(sendTabID);

	if (windows.length === 1) {
		const h1: HTMLElement = document.createElement('h1');
		h1.innerText = 'No other open windows';

		openWindowsElement.appendChild(h1);
	}

	const screenshots: string[] = await Promise.all(windows.map((w: browser.windows.Window): Promise<string> => {
		return browser.tabs.captureVisibleTab(w.id, {
			format: 'jpeg',
			quality: 30,
		});
	}));

	windows.forEach(async (w: browser.windows.Window, i: number): Promise<void> => {
		const index = (i + 1).toString();

		if (w.tabs) {
			const div: HTMLDivElement = document.createElement('div');
			div.className = 'screenshot';
			div.style.backgroundImage = `url(${screenshots[i]})`;
			div.innerHTML = `<div class="title-bar"> <img src="${w.tabs[0].favIconUrl}"/>
				<div class="screen-title">${w.tabs[0].title}</div></div>
				<div class="screen-index">${index}</div>
				<div class="tab-count">${w.tabs.length + (w.tabs.length === 1 ? " tab" : " tabs")}
				</div>`;

			div.addEventListener('click', async (): Promise<void> => {
				await moveTabToWindow(w, t);
			});

			openWindowsElement.appendChild(div);
		}
	});

	utils.queryOrThrow('body').addEventListener(
		'keydown',
		async (e: KeyboardEvent) => {
			const index: number = parseInt(e.key) - 1;
			if (isNaN(index)) {
				return;
			}

			if (index < 0 || index >= windows.length) {
				return;
			}

			await moveTabToWindow(windows[index], t);
		}
	);

	utils.queryOrThrow('#current-tab').innerHTML = `<div class="title-bar"><img src="${t.favIconUrl}"/>` +
		`<div class="screen-title">${t.title}</div></div>`;
};
