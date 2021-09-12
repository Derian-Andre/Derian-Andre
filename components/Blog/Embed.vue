<template>
	<LazyEmbed :src="src" :title="title"/>
</template>

<script>
	export default {
		name: 'blog-embed',
		props: ['src', 'title']
	}
</script>