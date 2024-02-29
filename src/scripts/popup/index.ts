'use strict';


import * as tabbo from '../tabbo';
import * as utils from '../utils';

import browser from 'webextension-polyfill';


const port: browser.Runtime.Port = browser.runtime.connect();


utils.queryOrThrow('#pop').addEventListener('click', (): void => {
	port.postMessage({action: tabbo.PopUpCommand.POP_TAB});
});


utils.queryOrThrow('#send').addEventListener('click', (): void => {
	port.postMessage({action: tabbo.PopUpCommand.PUSH_TAB});
});


utils.queryOrThrow('#join').addEventListener('click', (): void => {
	port.postMessage({action: tabbo.PopUpCommand.GATHER_WINDOW});
});


/* FIXME
* Chrome doesn't support `browser.runtime.getBrowserInfo` so we can't use that!
* When it does, change to that.
*/
utils.queryOrThrow('#settings').addEventListener('click', (): void => {
	const browserType: utils.Browser = utils.checkBrowser();
	if (browserType === utils.Browser.CHROME) {
		// Chrome
		port.postMessage({action: tabbo.PopUpCommand.CHROME_KEYBINDS});
	} else if (browserType === utils.Browser.FIREFOX) {
		// Firefox
		port.postMessage({action: tabbo.PopUpCommand.KEYBINDS});
	} else {
		// FIXME
		alert('Invalid browser - only Chrome and Firefox are supoprted');
	}
});


utils.queryOrThrow('#help').addEventListener('click', (): void => {
	port.postMessage({action: tabbo.PopUpCommand.HELP});
});
