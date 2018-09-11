'use strict';

import * as tabbo from '../tabbo';
import * as functionality from './functionality';

import {browser} from 'webextension-polyfill-ts';


// Handle keyboard shortcuts
browser.commands.onCommand.addListener((cmd: tabbo.Command): void => {
	switch (cmd) {
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
browser.runtime.onConnect.addListener((port: browser.runtime.Port): void => {
	port.onMessage.addListener((cmd: tabbo.PopUpCommand): void => {
		switch (cmd) {
			case tabbo.PopUpCommand.KEYBINDS:
				// FIXME add keybind
				throw new tabbo.CommandNotFoundError(`Command not found: ${cmd}`);
				break;

			case tabbo.PopUpCommand.INSTRUCTIONS:
				// FIXME add instructions
				throw new tabbo.CommandNotFoundError(`Command not found: ${cmd}`);
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
