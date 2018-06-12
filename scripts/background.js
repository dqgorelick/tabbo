const api = window.api;

const directions = {
	LEFT: 0,
	RIGHT: 1
};

chrome.commands.onCommand.addListener((command) => {
	switch(command) {
		case 'move_right':
			moveTab(directions.RIGHT);
			break;
		case 'move_left':
			moveTab(directions.LEFT);
			break;
		case 'pop_off':
			popOffWindow();
			break;
		case 'send_tab':
			sendTabManager();
		default:
			break;
	}
});

// listener to the client
chrome.extension.onConnect.addListener((port) => {
	port.onMessage.addListener(async (msg) => {
		switch(msg) {
			case 'keybinds' :
				await api.tab.create({url : 'chrome://extensions/configureCommands'});
				break;
			case 'instructions' :
				await api.tab.create({url : '../instructions.html'});
				break;
			case 'pop':
				await popOffWindow();
				break;
			case 'send':
				sendTabManager();
				break;
			case 'explode':
				explodeTabs();
				break;
			case 'join':
				joinTabs();
				break;
			default:
				break;
		}
	});
});

async function moveTab(direction) {
	const pinnedTabs = await api.tab.query({currentWindow: true, pinned: true});
	const unpinnedTabs = await api.tab.query({currentWindow: true, pinned: false});
	const tabs = Array.prototype.concat(pinnedTabs, unpinnedTabs);
	const tab = await api.tab.getCurrent();

	const currentIndex = tab.index;
	let newIndex, lowerBound, upperBound;

	if (tab.pinned) {
		lowerBound = 0;
		upperBound = pinnedTabs.length - 1;
	} else {
		lowerBound = pinnedTabs.length;
		upperBound = tabs.length - 1;
	}

	newIndex = (direction === directions.LEFT) ? prevTab(lowerBound, upperBound, currentIndex) : nextTab(lowerBound, upperBound, currentIndex);

	await api.tab.move(tab.id, {index: newIndex});
}

function prevTab(lowerBound, upperBound, currentIndex) {
	return (currentIndex === lowerBound) ? upperBound : currentIndex - 1;
}

function nextTab(lowerBound, upperBound, currentIndex) {
	return (currentIndex === upperBound) ? lowerBound : currentIndex + 1;
}

async function popOffWindow() {
	const w = await api.window.getCurrent({populate:true});
	if (w.tabs.length !== 1) {
		const tab = await api.tab.getCurrent();
		await api.window.create({tabId: tab.id});
		await api.tab.update(tab.id, {pinned: tab.pinned});
	}
}

async function sendTabManager() {
	const windows = await api.window.getAll({populate: true});
	const currentWindow = await api.window.getCurrent();

	if (windows.length === 1) {
		// do nothing
		return;
	} else if (windows.length === 2) {
		// send tab to only other window
		const tab = await api.tab.getCurrent();
		const otherWindow = windows.filter((filterWindow) => {
			return (filterWindow.id !== tab.windowId);
		});

		chrome.tabs.move(tab.id, {windowId: otherWindow[0].id, index: -1});
		chrome.windows.update(otherWindow[0].id, {focused: true});
		chrome.tabs.update(tab.id, {selected: true, pinned: tab.pinned});
	} else {
		const tab = await api.tab.getCurrent();
		const newTab = await api.tab.create({url : `../tabbo.html#${tab.id}`});

		chrome.tabs.onActivated.addListener(async (response) => {
			if (response.tabId !== newTab.id) {
				chrome.tabs.onActivated.removeListener(onTabChange);

				await api.tab.get(newTab.id);

				if (!chrome.runtime.lastError) {
					chrome.tabs.remove(newTab.id);
				}
			}
		});
	}
}

function explodeTabs() {
	const chromeWindows = api.window.getAll({populate: true});
	chromeWindows.forEach((chromeWindow) => {
		chromeWindow.tabs.forEach((tab) => {
			const width = Math.floor((Math.random() * (screen.width * 0.75)) + 1);
			const height = Math.floor((Math.random() * (screen.height * 0.75)) + 1);

			chrome.windows.create({
				tabId: tab.id,
				width: width,
				height: height,
				left: Math.floor(Math.random() * (screen.width - width) + 1),
				top: Math.floor(Math.random() * (screen.height - height) + 1),
			});
		});
	});
}

function joinTabs() {
	const chromeWindows = api.window.getAll({populate: true});
	let isFirstWindow = true;
	let firstWindowId = null;

	chromeWindows.forEach((chromeWindow) =>{
		if (isFirstWindow) {
			isFirstWindow = false;
			firstWindowId = chromeWindow.id;

			// make it fullscreen
			chrome.windows.update(firstWindowId, {
				left: 0,
				top: 0,
				width: screen.width,
				height: screen.height
			});
		} else {
			chromeWindow.tabs.forEach((tab) => {
				chrome.tabs.move(tab.id, {windowId: firstWindowId, index: -1});
			});
		}
	});
}
