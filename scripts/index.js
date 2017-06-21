const utils = window.utils;
const toSendId = window.location.hash.slice(1);

Promise.all([
	utils.getAllWindows({populate: true}),
	utils.getCurrentWindow()
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

		utils.screenshotTab(w.id, {quality: 50}).then((img) => {
			const num = count.toString();

			document.querySelector('body').addEventListener('keydown', (e) => {
				if (e.key === num) {
					selectWindow(w, toSendId);
				}
			});

			const div = document.createElement('div');
			div.className = 'screenshot';
			div.style = `background-image: url(${img})`;
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
		});
	});

	utils.getTab(parseInt(toSendId)).then((tab) => {
		document.querySelector('#current-tab').innerHTML = `<div class="title-bar"><img src="${tab.favIconUrl}"/>` +
			`<div class="screen-title">${tab.title}</div></div>`;
	});
});

document.querySelector('body').addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		utils.getSelectedTab().then((tab) => {
			chrome.tabs.remove(tab.id);
		});
	}
})

document.querySelector('#cancel').addEventListener('click', () => {
	utils.getSelectedTab().then((tab) => {
		chrome.tabs.remove(tab.id);
	});
});

function selectWindow(eachWindow, toSendId) {
	utils.getSelectedTab().then((tab) => {
		chrome.tabs.remove(tab.id);
	});

	sendTab(eachWindow.id, parseInt(toSendId));
}

function sendTab(windowId, tabId) {
	chrome.tabs.move(tabId, {windowId: windowId, index: -1});
	chrome.windows.update(windowId, {focused: true});
	chrome.tabs.update(tabId, {selected: true});
}

const port = chrome.runtime.connect({name: 'tabbo in we go!'});

document.querySelector('#keybinds').addEventListener('click', () => {
	port.postMessage('keybinds');
});
