'use strict';

import * as tabbo from '../tabbo';
import * as functionality from './functionality';

import browser from 'webextension-polyfill';


// Handle keyboard shortcuts
browser.commands.onCommand.addListener((cmd: string): void => {
	const cmdEnum: tabbo.Command = tabbo.Command[<keyof typeof tabbo.Command>cmd];
	switch (cmdEnum) {
		case tabbo.Command.MOVE_RIGHT:
			functionality.moveTab(tabbo.Direction.RIGHT);
			break;

		case tabbo.Command.MOVE_LEFT:
			functionality.moveTab(tabbo.Direction.LEFT);
			break;

		case tabbo.Command.POP_TAB:
			functionality.popTab();
			break;

		case tabbo.Command.PUSH_TAB:
			functionality.pushTab();
			break;

		default:
			throw new tabbo.CommandNotFoundError(`Command not found: ${cmd}`);
	};
});


// Handle popup commands
browser.runtime.onConnect.addListener((port: browser.Runtime.Port): void => {
	port.onMessage.addListener(async (cmd: tabbo.PortMessage): Promise<void> => {
		switch (cmd.action) {
			case tabbo.PopUpCommand.KEYBINDS:
				await browser.tabs.create({url : '../configuration.html'});
				break;

			case tabbo.PopUpCommand.CHROME_KEYBINDS:
				await browser.tabs.create({url : 'chrome://extensions/configureCommands'});
				break;

			case tabbo.PopUpCommand.HELP:
				await browser.tabs.create({url : '../help.html'});
				break;

			case tabbo.PopUpCommand.POP_TAB:
				functionality.popTab();
				break;

			case tabbo.PopUpCommand.PUSH_TAB:
				functionality.pushTab();
				break;

			case tabbo.PopUpCommand.EXPLODE_WINDOW:
				functionality.explodeWindow();
				break;

			case tabbo.PopUpCommand.GATHER_WINDOW:
				functionality.gatherWindow();
				break;

			default:
				throw new tabbo.CommandNotFoundError(`Command not found: ${cmd}`);
		};
	});
});
