'use strict';


import * as tabbo from '../tabbo';
import * as utils from '../utils';

import {browser} from 'webextension-polyfill-ts';


const port: browser.runtime.Port = browser.runtime.connect();


utils.queryOrThrow('#keybinds').addEventListener('click', async (): void => {
	/* FIXME
	 * This is a pretty hacky way of detecting browser. No other browser other than Firefox
	 * supports `browser.commands.update` as of 02/15/19 so check if it's available.
	 * If it isn't, then it's probably Chrome as we only package the extension for Chrome and
	 * Firefox as of now. Chrome also doesn't support `browser.runtime.getBrowserInfo` so
	 * we can't use that!
	 */
	if (browser.commands.update === null) {
		// Chrome
		port.postMessage(tabbo.PopUpCommand.CHROME_KEYBINDS);
	} else {
		// Firefox
		port.postMessage(tabbo.PopUpCommand.KEYBINDS);
	}
});


utils.queryOrThrow('#instructions').addEventListener('click', (): void => {
	port.postMessage(tabbo.PopUpCommand.INSTRUCTIONS);
});


utils.queryOrThrow('#pop').addEventListener('click', (): void => {
	port.postMessage(tabbo.PopUpCommand.POP_TAB);
});


utils.queryOrThrow('#send').addEventListener('click', (): void => {
	port.postMessage(tabbo.PopUpCommand.PUSH_TAB);
});


utils.queryOrThrow('#join').addEventListener('click', (): void => {
	port.postMessage(tabbo.PopUpCommand.GATHER_WINDOW);
});


let bonusClicked: number = 0;
const bonusElem: HTMLElement = utils.queryOrThrow('#bonus');


bonusElem.addEventListener('click', (): void => {
	bonusClicked += 1;

	if (bonusClicked === 1) {
		bonusElem.innerHTML = 'stop it';
	} else if (bonusClicked === 2) {
		bonusElem.innerHTML = 'I\'m warning you';
	} else if (bonusClicked === 3) {
		bonusElem.innerHTML = 'last warning...';
	}

	if (bonusClicked > 3) {
		bonusElem.innerHTML = 'explode!!';
		port.postMessage(tabbo.PopUpCommand.EXPLODE_WINDOW);
	}
});
