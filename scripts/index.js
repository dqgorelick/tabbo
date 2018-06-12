(async () => {
	const api = window.api;

	const toSendId = window.location.hash.slice(1);

	const windows = await api.window.getAll({populate: true});
	const current = await api.window.getCurrent();
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

		const img = await api.tab.screenshot(w.id, {quality: 50});
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

	const tab = api.tab.get(parseInt(toSendId));
	document.querySelector('#current-tab').innerHTML = `<div class="title-bar"><img src="${tab.favIconUrl}"/>` +
		`<div class="screen-title">${tab.title}</div></div>`;

	document.querySelector('body').addEventListener('keydown', async (e) => {
		if (e.key === 'Escape') {
			const tab = await api.tab.getSelected();
			await api.tab.remove(tab.id);
		}
	})

	document.querySelector('#cancel').addEventListener('click', () => {
		const tab = await api.tab.getSelected();
		await api.tab.remove(tab.id);
	});

	function selectWindow(eachWindow, toSendId) {
		const tab = await api.tab.getSelected();
		await api.tab.remove(tab.id);

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
})();
