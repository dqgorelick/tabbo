'use strict';

/* This component is meant to represent a brower window
 */

import { property, html, Hybrids } from 'hybrids';

interface WindowCard extends HTMLElement {
	index: number,
	screenshot: string,
	faviconUrl: string,
	title: string,
	tabCount: number,
}

const toRender = (host) => html`
	<div class="screenshot" background-image="url(${host.screenshot})">
		<div>
			<h1>
				${host.index}
			</h1>
		</div>

		<div class="title-bar">
			<img src="${host.faviconUrl}"/>
			<p> ${host.title} </p>
			<p> ${host.tabCount} </p>
		</div>
	</div>
`;

export const WindowCard: Hybrids<WindowCard> = {
	index: property(0),
	screenshot: property(''),
	faviconUrl: property(''),
	title: property(''),
	render: toRender,
};

export const WindowCardElem = define('window-card', WindowCard);
