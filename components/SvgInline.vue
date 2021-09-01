<template>
	<figure>
		<div v-html="require(`~/static/assets/${src}?raw`)" />
		<figcaption v-html="caption" v-if="caption" />
	</figure>
</template>

<script>
export default {
	name: 'svg-inline',
	props: ['src', 'caption']
}
</script>