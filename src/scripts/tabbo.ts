"use strict";

export enum Direction {
  LEFT,
  RIGHT,
}

export enum Command {
  PIN_TOGGLE = "PIN_TOGGLE",
  MOVE_LEFT = "MOVE_LEFT",
  MOVE_RIGHT = "MOVE_RIGHT",
  POP_TAB = "POP_TAB",
  PUSH_TAB = "PUSH_TAB",
}

export interface PortMessage {
  action: PopUpCommand;
}

export enum PopUpCommand {
  PIN_TOGGLE = "PIN_TOGGLE",
  CHROME_KEYBINDS = "CHROME_KEYBINDS",
  EXPLODE_WINDOW = "EXPLODE_WINDOW",
  GATHER_WINDOW = "GATHER_WINDOW",
  HELP = "HELP",
  KEYBINDS = "KEYBINDS",
  POP_TAB = "POP_TAB",
  PUSH_TAB = "PUSH_TAB",
}

export class CommandNotFoundError extends Error {}

export interface TabsOnActivatedEvent {
  tabId: number;
  windowId: number;
}

export type TabsOnActivatedCallback = (e: TabsOnActivatedEvent) => void;
