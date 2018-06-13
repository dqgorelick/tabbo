'use strict';

const util = window.util;

const directions = {
	LEFT: 0,
	RIGHT: 1
};

browser.commands.onCommand.addListener(async (command) => {
	switch(command) {
		case 'move_right':
			await moveTab(directions.RIGHT);
			break;
		case 'move_left':
			await moveTab(directions.LEFT);
			break;
		case 'pop_off':
			await popOffWindow();
			break;
		case 'send_tab':
			await sendTabManager();
			break;
		default:
			break;
	}
});

// listener to the client
browser.runtime.onConnect.addListener((port) => {
	port.onMessage.addListener(async (msg) => {
		switch(msg) {
			case 'keybinds' :
				await browser.tabs.create({url : 'chrome://extensions/configureCommands'});
				break;
			case 'instructions' :
				await browser.tabs.create({url : '../instructions.html'});
				break;
			case 'pop':
				await popOffWindow();
				break;
			case 'send':
				await sendTabManager();
				break;
			case 'explode':
				await explodeTabs();
				break;
			case 'join':
				await joinTabs();
				break;
			default:
				break;
		}
	});
});

async function moveTab(direction) {
	const tabs = await browser.tabs.query({currentWindow: true});
	const pinnedTabs = tabs.filter((e) => e.pinned);
	const unpinnedTabs = tabs.filter((e) => !e.pinned);
	const highlightedTabs = tabs.filter((e) => e.highlighted);
	const nonHighlightedTabs = tabs.filter((e) => !e.highlighted);
	const tab = await util.tabs.getCurrent();

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

	try {
		await browser.tabs.move(tab.id, {index: newIndex});
	} catch (e) {
		console.error(e);
	}
}

function prevTab(lowerBound, upperBound, currentIndex) {
	return (currentIndex === lowerBound) ? upperBound : currentIndex - 1;
}

function nextTab(lowerBound, upperBound, currentIndex) {
	return (currentIndex === upperBound) ? lowerBound : currentIndex + 1;
}

async function popOffWindow() {
	const w = await browser.windows.getCurrent({populate:true});
	if (w.tabs.length !== 1) {
		const tab = await util.tabs.getCurrent();

		await browser.windows.create({tabId: tab.id});
		await browser.tabs.update(tab.id, {pinned: tab.pinned});
	}
}

async function sendTabManager() {
	const windows = await browser.windows.getAll({populate: true});
	const currentWindow = await browser.windows.getCurrent();

	if (windows.length === 1) {
		// do nothing
		return;
	} else if (windows.length === 2) {
		// send tab to only other window
		const tab = await util.tabs.getCurrent();
		const otherWindow = windows.filter((filterWindow) => {
			return (filterWindow.id !== tab.windowId);
		});

		await browser.tabs.move(tab.id, {windowId: otherWindow[0].id, index: -1});
		await browser.windows.update(otherWindow[0].id, {focused: true});
		await browser.tabs.update(tab.id, {selected: true, pinned: tab.pinned});
	} else {
		const tab = await util.tabs.getCurrent();
		const newTab = await browser.tabs.create({url : `../tabbo.html#${tab.id}`});

		const onTabChange = async (response) => {
			if (response.tabId !== newTab.id) {
				browser.tabs.onActivated.removeListener(onTabChange);

				await browser.tabs.get(newTab.id);
				if (!browser.runtime.lastError) {
					await browser.tabs.remove(newTab.id);
				}
			}
		};

		browser.tabs.onActivated.addListener(onTabChange);
	}
}

async function explodeTabs() {
	const chromeWindows = await browser.windows.getAll({populate: true});
	chromeWindows.forEach((chromeWindow) => {
		chromeWindow.tabs.forEach(async (tab) => {
			const width = Math.floor((Math.random() * (screen.width * 0.75)) + 1);
			const height = Math.floor((Math.random() * (screen.height * 0.75)) + 1);

			await browser.windows.create({
				tabId: tab.id,
				width: width,
				height: height,
				left: Math.floor(Math.random() * (screen.width - width) + 1),
				top: Math.floor(Math.random() * (screen.height - height) + 1),
			});
		});
	});
}

async function joinTabs() {
	const chromeWindows = await browser.windows.getAll({populate: true});
	let isFirstWindow = true;
	let firstWindowId = null;

	chromeWindows.forEach(async (chromeWindow) =>{
		if (isFirstWindow) {
			isFirstWindow = false;
			firstWindowId = chromeWindow.id;

			// make it fullscreen
			await browser.windows.update(firstWindowId, {
				left: 0,
				top: 0,
				width: screen.width,
				height: screen.height
			});
		} else {
			chromeWindow.tabs.forEach(async (tab) => {
				await browser.tabs.move(tab.id, {windowId: firstWindowId, index: -1});
			});
		}
	});
}
