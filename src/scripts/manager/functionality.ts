"use strict";

import * as utils from "../utils";

import browser from "webextension-polyfill";

const buildCurrentTabPreview = (
  t: browser.Tabs.Tab,
  screenshot: string,
): HTMLElement => {
  const div: HTMLDivElement = document.createElement("div");
  div.id = "current-tab";
  div.className = "preview";
  div.style.backgroundImage = `url(${screenshot})`;
  div.innerHTML = `
	<div class="preview-top"></div>
	<div class="preview-bottom">
	<img src="${t.favIconUrl}"/>
		<p>
			${t.title}
		</p>
	</div>
	`;

  return div;
};

const buildWindowPreview = (
  w: browser.Windows.Window,
  screenshot: string,
  index: number,
): HTMLDivElement => {
  const div: HTMLDivElement = document.createElement("div");
  const tabs: browser.Tabs.Tab[] | undefined = w.tabs;
  if (tabs === undefined) {
    div.innerText = "Error getting tabs...";
    return div;
  }

  let currentTab = tabs.find((t: browser.Tabs.Tab) => {
    return t.active;
  });
  if (currentTab === undefined) {
    div.innerText = "Error getting current tab...";
    return div;
  }

  div.className = "preview window";
  div.style.backgroundImage = `url(${screenshot})`;
  div.innerHTML = `
	<div class="preview-top">
		<h3>${index}</h3>
	</div>
	<div class="preview-bottom">
		<img src="${currentTab.favIconUrl}"/>
		<p>
			${currentTab.title}
		</p>
		<div class="spanner"></div>
		<p>${tabs.length + (tabs.length === 1 ? " tab" : " tabs")}</p>
	</div>
	`;

  return div;
};

export const moveTabToWindow = async (
  w: browser.Windows.Window,
  t: browser.Tabs.Tab,
): Promise<void> => {
  if (w.id === undefined || t.id === undefined) {
    return;
  }

  await browser.tabs.move(t.id, { windowId: w.id, index: -1 });
  await browser.windows.update(w.id, { focused: true });
  await browser.tabs.update(t.id, { active: true, pinned: t.pinned });
};

export const main = async (sendTabID: number): Promise<void> => {
  const current: browser.Windows.Window = await browser.windows.getCurrent();
  const t: browser.Tabs.Tab = await browser.tabs.get(sendTabID);
  /*
   *let currentScreenshot = await browser.tabs.captureVisibleTab(
   *      current.id,
   *      {
   *        format: 'jpeg',
   *        quality: 30
   *      }
   *    );
   */
  utils
    .queryOrThrow("#current-tab-container")
    .prepend(buildCurrentTabPreview(t, ""));

  const windows: browser.Windows.Window[] = (
    await browser.windows.getAll({
      populate: true,
      windowTypes: ["normal"],
    })
  )
    .filter((w: browser.Windows.Window): boolean => {
      // not current
      return current.id !== w.id;
    })
    .sort((a: browser.Windows.Window, b: browser.Windows.Window): number => {
      const aId = a.id as number;
      const bId = b.id as number;
      if (aId < bId) {
        return -1;
      } else if (aId > bId) {
        return 1;
      }

      return 0;
    });

  if (windows.length === 1) {
    alert("No other open window is available");
    let current = await utils.tabs.getCurrent();
    await browser.tabs.remove(current.id as number);
    return;
  }

  const windowsElem: HTMLElement = utils.queryOrThrow("#windows");
  const windowElems: HTMLDivElement[] = windows
    .map((w: browser.Windows.Window, i: number): HTMLDivElement | null => {
      const index = i + 1;

      if (w.tabs) {
        const div: HTMLDivElement = buildWindowPreview(w, "", index);

        div.addEventListener("click", async (): Promise<void> => {
          await moveTabToWindow(w, t);
        });

        windowsElem.appendChild(div);

        return div;
      }

      return null;
    })
    .filter((elem: HTMLDivElement | null): elem is HTMLDivElement => {
      return elem !== null;
    });

  utils
    .queryOrThrow("body")
    .addEventListener("keydown", async (e: KeyboardEvent) => {
      const index: number = parseInt(e.key) - 1;
      if (isNaN(index)) {
        return;
      }

      if (index < 0 || index >= windows.length) {
        return;
      }

      await moveTabToWindow(windows[index], t);
    });

  windows.forEach(
    async (w: browser.Windows.Window, i: number): Promise<void> => {
      console.log(browser.tabs.captureVisibleTab);
      const screenshot: string = await browser.tabs.captureVisibleTab(w.id, {
        format: "jpeg",
        quality: 1,
      });
      windowElems[i].style.backgroundImage = `url(${screenshot})`;
    },
  );
};
