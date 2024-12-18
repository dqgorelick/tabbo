"use strict";

import * as tabbo from "../tabbo";
import * as functionality from "./functionality";

import browser from "webextension-polyfill";

// Handle keyboard shortcuts
browser.commands.onCommand.addListener(async (cmd: string): Promise<void> => {
  // tabbo only supports operating on normal windows
  const currentWindow: browser.Windows.Window =
    await browser.windows.getCurrent();
  if (currentWindow.type !== "normal") {
    return;
  }

  const cmdEnum: tabbo.Command = tabbo.Command[<keyof typeof tabbo.Command>cmd];
  switch (cmdEnum) {
    case tabbo.Command.DUPLICATE:
      functionality.duplicate();
      break;

    case tabbo.Command.MOVE_RIGHT:
      functionality.moveTab(tabbo.Direction.RIGHT);
      break;

    case tabbo.Command.MOVE_LEFT:
      functionality.moveTab(tabbo.Direction.LEFT);
      break;

    case tabbo.Command.PIN_TOGGLE:
      functionality.pinToggle();
      break;

    case tabbo.Command.POP_TAB:
      functionality.popTab();
      break;

    case tabbo.Command.PUSH_TAB:
      functionality.pushTab();
      break;

    default:
      throw new tabbo.CommandNotFoundError(`Command not found: ${cmd}`);
  }
});

// Handle popup commands
browser.runtime.onConnect.addListener((port: browser.Runtime.Port): void => {
  port.onMessage.addListener(async (cmd: tabbo.PortMessage): Promise<void> => {
    // tabbo only supports operating on normal windows
    const currentWindow: browser.Windows.Window =
      await browser.windows.getCurrent();
    if (currentWindow.type !== "normal") {
      return;
    }

    switch (cmd.action) {
      case tabbo.PopUpCommand.CHROME_KEYBINDS:
        await browser.tabs.create({
          url: "chrome://extensions/configureCommands",
        });
        break;

      case tabbo.PopUpCommand.DUPLICATE:
        functionality.duplicate();
        break;

      case tabbo.PopUpCommand.EXPLODE_WINDOW:
        functionality.explodeWindow();
        break;

      case tabbo.PopUpCommand.GATHER_WINDOW:
        functionality.gatherWindow();
        break;

      case tabbo.PopUpCommand.HELP:
        await browser.tabs.create({ url: "../help.html" });
        break;

      case tabbo.PopUpCommand.KEYBINDS:
        await browser.tabs.create({ url: "../configuration.html" });
        break;

      case tabbo.PopUpCommand.PIN_TOGGLE:
        functionality.pinToggle();
        break;

      case tabbo.PopUpCommand.POP_TAB:
        functionality.popTab();
        break;

      case tabbo.PopUpCommand.PUSH_TAB:
        functionality.pushTab();
        break;

      default:
        throw new tabbo.CommandNotFoundError(`Command not found: ${cmd}`);
    }
  });
});
