'use strict';


import * as tabbo from '../tabbo';
import * as utils from '../utils';

import {browser} from 'webextension-polyfill-ts';


const port: browser.runtime.Port = browser.runtime.connect();


/* FIXME
* Chrome doesn't support `browser.runtime.getBrowserInfo` so we can't use that!
* When it does, change to that.
*/
/*
 *utils.queryOrThrow('#keybinds').addEventListener('click', (): void => {
 *  const browserType: utils.Browser = utils.checkBrowser();
 *  if (browserType === utils.Browser.CHROME) {
 *    // Chrome
 *    port.postMessage({action: tabbo.PopUpCommand.CHROME_KEYBINDS});
 *  } else if (browserType === utils.Browser.FIREFOX) {
 *    // Firefox
 *    port.postMessage({action: tabbo.PopUpCommand.KEYBINDS});
 *  } else {
 *    // FIXME
 *    alert('Invalid browser - only Chrome and Firefox are supoprted');
 *  }
 *});
 */

/*
 *utils.queryOrThrow('#instructions').addEventListener('click', (): void => {
 *  port.postMessage({action: tabbo.PopUpCommand.INSTRUCTIONS});
 *});
 */

 // TODO add functionality for settings

utils.queryOrThrow('#pop').addEventListener('click', (): void => {
	port.postMessage({action: tabbo.PopUpCommand.POP_TAB});
});


utils.queryOrThrow('#send').addEventListener('click', (): void => {
	port.postMessage({action: tabbo.PopUpCommand.PUSH_TAB});
});


utils.queryOrThrow('#join').addEventListener('click', (): void => {
	port.postMessage({action: tabbo.PopUpCommand.GATHER_WINDOW});
});
