'use strict';


import * as tabbo from '../tabbo';
import * as utils from '../utils';

import {browser} from 'webextension-polyfill-ts';


const port: browser.runtime.Port = browser.runtime.connect();


utils.queryOrThrow('#keybinds').addEventListener('click', (): void => {
	port.postMessage(tabbo.PopUpCommand.KEYBINDS);
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
