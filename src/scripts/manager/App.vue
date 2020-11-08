<template>
	<simple-element title="Hello world!"></simple-element>
</template>


<script lang="ts">
import SimpleElement from '../components/SimpleElement.vue';
import {ref, onMounted} from 'vue';

export default {
	components: {
		'simple-element': SimpleElement,
	},
	setup: () => {
		const windows = ref([]);
		const currentWindow = ref([]);

		onMounted(async () => {
			const current: browser.windows.Window = await browser.windows.getCurrent();
			const windows: browser.windows.Window[] = (
				await browser.windows.getAll({populate: true})
			).filter((w: browser.windows.Window): boolean => {
				return current.id !== w.id;
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
			windows,
			currentWindow,
		};
	},
};
</script>

<style lang="scss" scoped>
</style>
