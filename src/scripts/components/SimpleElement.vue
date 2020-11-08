<template>
	<p>{{title}}</p>
</template>

<script lang="ts">
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
	}
};
</script>

<style lang="scss" scoped>
</style>
