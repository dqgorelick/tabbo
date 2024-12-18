"use strict";

import browser from "webextension-polyfill";

export class ElementNotFoundError extends Error {}

export const queryOrThrow = (query: string): HTMLElement => {
  const elem: HTMLElement | null = document.querySelector(query);

  if (!elem) {
    throw new ElementNotFoundError(`Query ${query} not found`);
  }

  return elem;
};

export const tabs = {
  getCurrent: async (): Promise<browser.Tabs.Tab> => {
    return (await browser.tabs.query({ active: true, currentWindow: true }))[0];
  },
};

export enum Browser {
  OTHER = "OTHER",
  FIREFOX = "FIREFOX",
  CHROME = "CHROME",
}

export const checkBrowser = (): Browser => {
  if (navigator.userAgent.search("Chrome") > -1) {
    return Browser.CHROME;
  } else if (navigator.userAgent.search("Firefox") > -1) {
    return Browser.FIREFOX;
  }

  return Browser.OTHER;
};

enum ElemType {
  DIV = "div",
  IMG = "img",
  P = "p",
  H3 = "h3",
}

type ElemOptions = {
  id?: string | null;
  className?: string | null;
  style?: { [key: string]: string };
  innerText?: string;
};

export const buildElem = (
  elemName: ElemType,
  options: ElemOptions,
  children?: HTMLElement[] | null,
): HTMLElement => {
  const elem = document.createElement(elemName);

  // TODO maybe use setAttribute instead?
  if (options.id) {
    elem.id = options.id;
  }

  if (options.className) {
    elem.className = options.className;
  }

  if (options.style) {
    for (const [k, v] of Object.entries(options.style)) {
      elem.style.setProperty(k, v);
    }
  }

  if (options.innerText) {
    elem.innerText = options.innerText;
  }

  if (children) {
    for (let child of children) {
      elem.appendChild(child);
    }
  }

  return elem;
};

type DivOptions = ElemOptions & {};

export const buildDiv = (
  options: DivOptions,
  children?: HTMLElement[] | null,
): HTMLDivElement => {
  return buildElem(ElemType.DIV, options, children) as HTMLDivElement;
};

type ImgOptions = ElemOptions & {
  src: string;
};

export const buildImg = (
  options: ImgOptions,
  children?: HTMLElement[] | null,
): HTMLImageElement => {
  let elem = buildElem(ElemType.IMG, options, children) as HTMLImageElement;
  elem.src = options.src;
  return elem;
};

type POptions = ElemOptions & {};

export const buildP = (
  options: POptions,
  children?: HTMLElement[] | null,
): HTMLParagraphElement => {
  return buildElem(ElemType.P, options, children) as HTMLParagraphElement;
};

type H3Options = ElemOptions & {};

export const buildH3 = (
  options: H3Options,
  children?: HTMLElement[] | null,
): HTMLHeadingElement => {
  return buildElem(ElemType.H3, options, children) as HTMLHeadingElement;
};
