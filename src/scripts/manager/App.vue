<template>
	<div id="current-tab-wrapper">
		<window-card id="current-tab" :browser-window="browserWindows.current"></window-card>

		<div id="cancel">
			close dashboard
		</div>
		<div id="current-tab-instructions">
			<h2>Current tab captured</h2>
			<h2>send tab to...</h2>
		</div>
	</div>

	<div class="wrapper">
		<p id="tabbo-title">Tabbo Dashboard</p>
		<p id="keybinds">Customize hotkeys</p>
		<div id="open-windows">
			<window-card v-for="(window, index) in browserWindows.rest" :index="index" :browser-window="window"></window-card>
		</div>
		<div id="hackny"><a target="_blank" href="http://hackny.org/"><img src="https://pbs.twimg.com/profile_images/798720047/hackny_logo_square_400x400.png"></a></div>
		<div id="github"><a target="_blank" href="https://github.com/hackny2016labs/tabbo"><p>Github</p></a></div>
	</div>
	<h3 class="directions">Click window or type a number to send tab to that screen</h3>
</template>

<script lang="ts">
import {ref, reactive, onBeforeMount} from 'vue';

// components
import WindowCard from '../components/WindowCard.vue';

export default {
	components: {
		'window-card': WindowCard,
	},

	setup: () => {
		const browserWindows = reactive({
			current: {
				tabs: []
			},
			rest: [],
		});

		browser.windows.getAll({populate: true}).then((val) => {
			browserWindows.current = val.find((w) => {
				return w.focused;
			});

			browserWindows.rest = val.filter((w: browser.windows.Window): boolean => {
				return !w.focused;
			}).sort((a: browser.windows.Window, b: browser.windows.Window): number => {
				if (a.id < b.id) {
					return -1;
				} else if (a.id > b.id) {
					return 1;
				}

				return 0;
			});
		});

		return {
			browserWindows,
		};
	},
};
</script>

<style lang="scss" scoped>
</style>
