'use strict';


export enum Direction {
	LEFT,
	RIGHT,
};


export enum Command {
	MOVE_RIGHT = "MOVE_RIGHT",
	MOVE_LEFT = "MOVE_LEFT",
	POP_TAB = "POP_TAB",
	PUSH_TAB = "PUSH_TAB",
};


export enum PopUpCommand {
	CHROME_KEYBINDS = "CHROME_KEYBINDS",
	KEYBINDS = "KEYBINDS",
	INSTRUCTIONS = "INSTRUCTIONS",
	POP_TAB = "POP_TAB",
	PUSH_TAB = "PUSH_TAB",
	EXPLODE_WINDOW = "EXPLODE_WINDOW",
	GATHER_WINDOW = "GATHER_WINDOW",
};


export class CommandNotFoundError extends Error {};


export interface TabsOnActivatedEvent {
	tabId: number;
	windowId: number;
};


export type TabsOnActivatedCallback = (e: TabsOnActivatedEvent) => void;
