'use strict';

/* This component is meant to represent a brower window
 * in the manager
 */

import {browser} from 'webextension-polyfill-ts';
import { defineComponent, ref, onMounted } from 'vue';

const template = `
	<div class="screenshot" background-image="url({{screenshot}})">
		<div>
			<h1>
			{{index}}
			</h1>
		</div>

		<div class="title-bar">
			<img src="{{faviconUrl}}"/>
			<p> {{title}} </p>
			<p> {{tabCount}} </p>
		</div>
	</div>
`;

const WindowCard = defineComponent({
	props: {
		index: {
			type: Number,
			required: true,
		},
		window: {
			type: browser.windows.Window,
			required: true,
		},
	},

	setup: (props) => {
		const screenshot = ref("");
		const faviconUrl = ref("");
		const title = ref("");
		const tabCount = ref(0);

		// try finding the active tab, otherwise default to the first tab
		const tab = window.tabs.find(t => t.active) ?? w.tabs[0];
		faviconUrl.value = tab.favIconUrl;
		title.value = tab.title;
		tabCount.value = w.tabs.length;

		onMounted(async () => {
			return await browser.tabs.captureVisibleTab(props.window.id, {
				format: 'jpeg',
				quality: 30,
			});
		});

		return {
			screenshot,
			faviconUrl,
			title,
			tabCount,
		};
	},

	template: template,
});

export default WindowCard;
