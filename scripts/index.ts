'use strict';


import * as util from 'util.ts';


const util = window.util;
const toSendId = parseInt(window.location.hash.slice(1));

Promise.all([
	browser.windows.getAll({populate: true}),
	browser.windows.getCurrent()
]).then((resolution) => {
	const windows = resolution[0];
	const current = resolution[1];
	let count = 1;

	const openWindows = document.querySelector('#open-windows');

	if (windows.length === 1) {
		const h1 = document.createElement('h1');
		h1.innerText = 'No other open windows.';

		openWindows.appendChild(h1);
	}

	windows.forEach((w) => {
		if (w.id === current.id) {
			return;
		}

		//browser.tabs.captureVisibleTab(w.id, {format: 'jpeg', quality: 50}).then((img) => {
			const num = count.toString();

			document.querySelector('body').addEventListener('keydown', (e) => {
				if (e.key === num) {
					selectWindow(w, toSendId);
				}
			});

			const div = document.createElement('div');
			div.className = 'screenshot';
			//div.style = `background-image: url(${img})`;
			div.innerHTML = `<div class="title-bar"> <img src="${w.tabs[0].favIconUrl}"/>
				<div class="screen-title">${w.tabs[0].title}</div></div>
				<div class="screen-index">${count}</div>
				<div class="tab-count">${w.tabs.length + (w.tabs.length === 1 ? " tab" : " tabs")}
				</div>`;

			div.addEventListener('click', () => {
				selectWindow(w, toSendId);
			});

			openWindows.appendChild(div);

			count++;
		//});
	});

	browser.tabs.get(toSendId).then((tab) => {
		document.querySelector('#current-tab').innerHTML = `<div class="title-bar"><img src="${tab.favIconUrl}"/>` +
			`<div class="screen-title">${tab.title}</div></div>`;
	});
});

document.querySelector('body').addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		util.tabs.getCurrent().then((tab) => {
			browser.tabs.remove(tab.id);
		});
	}
})

document.querySelector('#cancel').addEventListener('click', () => {
	util.tabs.getCurrent().then((tab) => {
		browser.tabs.remove(tab.id);
	});
});

function selectWindow(eachWindow, toSendId) {
	browser.tabs.move(toSendId, {windowId: eachWindow.id, index: -1}).then(() => {
		return browser.windows.update(eachWindow.id, {focused: true});
	}).then(() => {
		return browser.tabs.update(toSendId, {selected: true});
	});
}

const port = browser.runtime.connect({name: 'tabbo in we go!'});

document.querySelector('#keybinds').addEventListener('click', () => {
	port.postMessage('keybinds');
});
