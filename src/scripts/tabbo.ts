"use strict";

export enum Direction {
  LEFT,
  RIGHT,
}

export enum Command {
	DUPLICATE = "DUPLICATE",
  MOVE_LEFT = "MOVE_LEFT",
  MOVE_RIGHT = "MOVE_RIGHT",
  PIN_TOGGLE = "PIN_TOGGLE",
  POP_TAB = "POP_TAB",
  PUSH_TAB = "PUSH_TAB",
}

export interface PortMessage {
  action: PopUpCommand;
}

export enum PopUpCommand {
  CHROME_KEYBINDS = "CHROME_KEYBINDS",
	DUPLICATE = "DUPLICATE",
  EXPLODE_WINDOW = "EXPLODE_WINDOW",
  GATHER_WINDOW = "GATHER_WINDOW",
  HELP = "HELP",
  KEYBINDS = "KEYBINDS",
  PIN_TOGGLE = "PIN_TOGGLE",
  POP_TAB = "POP_TAB",
  PUSH_TAB = "PUSH_TAB",
}

export class CommandNotFoundError extends Error {}

export interface TabsOnActivatedEvent {
  tabId: number;
  windowId: number;
}

export type TabsOnActivatedCallback = (e: TabsOnActivatedEvent) => void;
