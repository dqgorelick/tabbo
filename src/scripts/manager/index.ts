'use strict';


import * as tabbo from '../tabbo';
import * as utils from '../utils';
import * as functionality from './functionality';

import App from './App.vue';

import {browser} from 'webextension-polyfill-ts';
import {createApp} from 'vue';


let app = createApp(App).mount('#app');

/*
 *const sendTabID: number = parseInt(window.location.hash.slice(1));
 *
 *
 *functionality.main(sendTabID);
 *
 *
 *utils.queryOrThrow('body').addEventListener(
 *  'keydown',
 *  (e: KeyboardEvent): void => {
 *    if (e.key === 'Escape') {
 *      utils.tabs.getCurrent().then((t: browser.tabs.Tab): void => {
 *        browser.tabs.remove(t.id);
 *      });
 *    }
 *  }
 *);
 *
 *
 *utils.queryOrThrow('#cancel').addEventListener('click', (): void => {
 *  utils.tabs.getCurrent().then((t: browser.tabs.Tab): void => {
 *    browser.tabs.remove(t.id);
 *  });
 *});
 *
 *
 *const port = browser.runtime.connect();
 *
 *
 *utils.queryOrThrow('#keybinds').addEventListener('click', (): void => {
 *  port.postMessage(tabbo.PopUpCommand.KEYBINDS);
 *});
 */
