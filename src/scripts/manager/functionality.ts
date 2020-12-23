'use strict';

import * as utils from '../utils';

import {browser} from 'webextension-polyfill-ts';

const buildCurrentTabPreview = (t: browser.tabs.Tab, screenshot: string): HTMLElement => {
	const div: HTMLDivElement = document.createElement('div');
	div.id = 'current-tab';
	div.className = 'preview';
	div.style.backgroundImage = `url(${screenshot})`;
	div.innerHTML = `
	<div class="preview-top"></div>
	<div class="preview-bottom">
	<img src="${t.favIconUrl}"/>
		<p>
			${t.title}
		</p>
	</div>
	`;

	return div;
};


const buildWindowPreview = (w: browser.windows.Window, screenshot: string, index: number): HTMLElement => {
	const div: HTMLDivElement = document.createElement('div');
	div.className = 'preview window';
	div.style.backgroundImage = `url(${screenshot})`;
	div.innerHTML = `
	<div class="preview-top">
		<h3>${index}</h3>
	</div>
	<div class="preview-bottom">
		<img src="${w.tabs[0].favIconUrl}"/>
		<p>
			${w.tabs[0].title}
		</p>
		<div class="spanner"></div>
		<p>${w.tabs.length + (w.tabs.length === 1 ? " tab" : " tabs")}</p>
	</div>
	`;

	return div;
};


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

	const t: browser.tabs.Tab = await browser.tabs.get(sendTabID);
	if (windows.length === 1) {
		alert('No other open window is available');
		let current = await utils.tabs.getCurrent();
		await browser.tabs.remove(current.id);
		return;
	}

	const screenshots: string[] = await Promise.all(
		windows.map((w: browser.windows.Window): Promise<string> => {
			return browser.tabs.captureVisibleTab(
				w.id,
				{
					format: 'jpeg',
					quality: 30
				}
			);
		})
	);

	const windowsElem: HTMLElement = utils.queryOrThrow('#windows');
	windows.forEach(async (w: browser.windows.Window, i: number): Promise<void> => {
		const index = (i + 1).toString();

		if (w.tabs) {
			const div: HTMLDivElement = buildWindowPreview(w, screenshots[i], index);

			div.addEventListener('click', async (): Promise<void> => {
				await moveTabToWindow(w, t);
			});

			windowsElem.appendChild(div);
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

	/*
	 *let currentScreenshot = await browser.tabs.captureVisibleTab(
	 *      current.id,
	 *      {
	 *        format: 'jpeg',
	 *        quality: 30
	 *      }
	 *    );
	 */
	utils.queryOrThrow('#current-tab-container').prepend(buildCurrentTabPreview(t, ''));
};
