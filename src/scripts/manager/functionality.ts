'use strict';

import * as logging from '../logging';
import * as utils from '../utils';

import {browser} from 'webextension-polyfill-ts';


export const moveTabToWindow = async (w: browser.windows.Window, t: browser.tabs.Tab): Promise<void> => {
	browser.tabs.move(t.id, {windowId: w.id, index: -1}).catch(
		(e: Error): void => {
			logging.error(e.message);
		}
	);

	browser.windows.update(w.id, {focused: true}).catch(
		(e: Error): void => {
			logging.error(e.message);
		}
	);

	browser.tabs.update(t.id, {active: true, pinned: t.pinned}).catch(
		(e: Error): void => {
			logging.error(e.message);
		}
	);
};


export const main = async (sendTabID: number): Promise<void> => {
	const windows: browser.windows.Window[] = await browser.windows.getAll({populate: true});
	const current: browser.windows.Window = await browser.windows.getCurrent();
	let count: number = 1;

	const openWindowsElement: HTMLElement = utils.queryOrThrow('#open-windows');
	const t: browser.tabs.Tab = await browser.tabs.get(sendTabID);

	if (windows.length === 1) {
		const h1: HTMLElement = document.createElement('h1');
		h1.innerText = 'No other open windows';

		openWindowsElement.appendChild(h1);
	}

	windows.forEach((w: browser.windows.Window): void => {
		if (w.id === current.id) {
			return;
		}

		const windowNum = count.toString();
		utils.queryOrThrow('body').addEventListener(
			'keydown',
			(e: KeyboardEvent) => {
				if (e.key === windowNum) {
					moveTabToWindow(w, t);
				}
			}
		);

		if (w.tabs) {
			const div: HTMLDivElement = document.createElement('div');
			div.className = 'screenshot';
			div.innerHTML = `<div class="title-bar"> <img src="${w.tabs[0].favIconUrl}"/>
				<div class="screen-title">${w.tabs[0].title}</div></div>
				<div class="screen-index">${count}</div>
				<div class="tab-count">${w.tabs.length + (w.tabs.length === 1 ? " tab" : " tabs")}
				</div>`;

			div.addEventListener('click', (): void => {
				moveTabToWindow(w, t);
			});

			openWindowsElement.appendChild(div);
		}

		count++;
	});

	utils.queryOrThrow('#current-tab').innerHTML = `<div class="title-bar"><img src="${t.favIconUrl}"/>` +
		`<div class="screen-title">${t.title}</div></div>`;
};
