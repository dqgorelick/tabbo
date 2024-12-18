"use strict";

import * as utils from "../utils";

import browser from "webextension-polyfill";

const idPrefix = "config-";

const mapping = {
	DUPLICATE: {
		name: "Duplicate tab",
		id: "duplicate-tab"
	},
  MOVE_RIGHT: {
    name: "Move tab right",
    id: "move-tab-right",
  },
  MOVE_LEFT: {
    name: "Move tab left",
    id: "move-tab-left",
  },
  PUSH_TAB: {
    name: "Push tab",
    id: "push-tab",
  },
  POP_TAB: {
    name: "Pop tab",
    id: "pop-tab",
  },
  PIN_TOGGLE: {
    name: "Toggle pin status",
    id: "pin-toggle",
  },
};

const state = {
  changed: false,
};

class CommandSelector {
  name: string;
  description: string;
  shortcut: string;
  inputElem: HTMLInputElement;

  constructor(cmd: browser.Commands.Command, input: HTMLInputElement) {
    this.name = cmd.name as string;
    this.description = cmd.description as string;
    this.shortcut = cmd.shortcut as string;

    this.inputElem = input;
    this.inputElem.value = this.shortcut;
  }
}

window.addEventListener("load", async (_) => {
  const cmds = await browser.commands.getAll();
  const configurationsElem: HTMLElement = utils.queryOrThrow("#configurations");

  let commandSelectors: CommandSelector[] = cmds.map(
    (cmd: browser.Commands.Command) => {
      const mapped = mapping[cmd.name as string];

      const config = document.createElement("div");
      config.id = mapped.id;
      config.className = "configuration";

      config.addEventListener("click", (_) => {
        let activeElems = document.querySelectorAll(".active");
        for (let elem of activeElems) {
          elem.classList.remove("active");
        }

        config.classList.add("active");
      });

      const title = document.createElement("label");
      title.className = "configuration-name";
      title.innerText = mapped.name;
      title.setAttribute("for", `${idPrefix}-${mapped.id}`);

      const input = document.createElement("input");
      input.id = `${idPrefix}-${mapped.id}`;
      input.className = "configuration-input";

      input.addEventListener("change", () => {
        if (!state.changed) {
          state.changed = true;
          utils.queryOrThrow("#save").removeAttribute("disabled");
        }
      });

      const desc = document.createElement("p");
      desc.className = "configuration-description";
      desc.innerText = cmd.description || "";

      config.appendChild(title);
      config.appendChild(input);
      config.appendChild(desc);

      configurationsElem.appendChild(config);

      const cmdSelector = new CommandSelector(cmd, input);

      return cmdSelector;
    },
  );

  const saveElem = utils.queryOrThrow("#save");
  saveElem.addEventListener("click", async () => {
    if (saveElem.getAttribute("disabled") !== null) {
      return;
    }

    const promises = commandSelectors.map(
      async (cmdSelector: CommandSelector) => {
        if (cmdSelector.shortcut !== cmdSelector.inputElem.value) {
          await browser.commands.update({
            name: cmdSelector.name,
            shortcut: cmdSelector.inputElem.value,
          });
        }
      },
    );

    try {
      await Promise.all(promises);
    } catch (e) {
      alert(
        "Error saving, did you enter a valid combination? Check https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands#Key_combinations",
      );
      return;
    }

    alert("Saved");

    location.reload();
  });
});
