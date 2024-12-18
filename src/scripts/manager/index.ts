"use strict";

import * as utils from "../utils";
import * as functionality from "./functionality";

import browser from "webextension-polyfill";

const kSendTabId: number = parseInt(window.location.hash.slice(1));

functionality.main(kSendTabId);

utils
  .queryOrThrow("body")
  .addEventListener("keydown", (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      utils.tabs.getCurrent().then((t: browser.Tabs.Tab): void => {
        browser.tabs.remove(t.id as number);
      });
    }
  });

// const port = browser.runtime.connect();
