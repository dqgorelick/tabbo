'use strict';

import * as tabbo from '../tabbo';
import * as utils from '../utils';

import {browser} from 'webextension-polyfill-ts';


class CommandSelector {
	name: string;
	description: string;
	shortcut: string;
	inputElem: HTMLElement;

	constructor(cmd: brower.commands.Command) {
		this.name = cmd.name;
		this.description = cmd.description;
		this.shortcut = cmd.shortcut;
		this.inputElem = document.createElement('input');
		this.inputElem.value = this.shortcut;
	}
};


window.addEventListener('load', async (_) => {
	const cmds = await browser.commands.getAll();
	const cmdDiv: HTMLElement = utils.queryOrThrow('#commands');

	let commandSelectors: CommandSelector[] = cmds.map((cmd: browser.commands.Command) => {
		const cmdSelector = new CommandSelector(cmd);
		const div = document.createElement('div');
		div.className = 'col';

		const title = document.createElement('label');
		title.innerText = cmdSelector.name;
		const desc = document.createElement('p');
		desc.innerText = cmdSelector.description;

		div.appendChild(title);
		div.appendChild(desc);
		div.appendChild(cmdSelector.inputElem);
		cmdDiv.appendChild(div);

		return cmdSelector;
	});

	utils.queryOrThrow('#save').addEventListener('click', async () => {
		commandSelectors.forEach(async (cmdSelector: CommandSelector) => {
			if (cmdSelector.shortcut !== cmdSelector.inputElem.value) {
				await browser.commands.update({
					name: cmdSelector.name,
					shortcut: cmdSelector.inputElem.value
				});
			}
		});

		alert('Saved');

		location.reload();
	});
});
