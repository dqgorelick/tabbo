<template>
	<div class="screenshot" background-image="url({{screenshot}})">
		<div>
			<h1>
			{{index}}
			</h1>
		</div>

		<div class="title-bar">
			<img src="{{tab.faviconUrl}}"/>
			<p> {{tab.title}} </p>
			<p> {{tabCount}} </p>
		</div>
	</div>
</template>

<script lang="ts">
import asyncComputed from '../asyncHelper.ts'
import {browser} from 'webextension-polyfill-ts';
import { defineComponent, ref, onMounted, toRefs, computed } from 'vue';

export default {
	props: {
		index: {
			type: Number,
			required: false,
		},
		browserWindow: {
			type: browser.windows.Window,
			required: true,
		},
	},

	setup: (props) => {
		const tab = computed(() => {
			return props.browserWindow.tabs.find(t => t.active) ?? props.browserWindow.tabs[0] ?? {};
		});

		const screenshot = asyncComputed(async () => {
			if (props.browserWindow.id) {
				return await browser.tabs.captureVisibleTab(props.browserWindow.id, {
					quality: 30,
				});
			} else {
				return "";
			}
		}, () => "");

		const tabCount = computed(() => {
			return props.browserWindow.tabs.length;
		});

		return {
			tab,
			screenshot,
			tabCount,
		};
	}
};
</script>

<style lang="scss" scoped>
</style>
