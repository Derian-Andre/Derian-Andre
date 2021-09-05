<template>
	<div class="embed">
		<div class="ratio ratio-16x9">
			<iframe :src="src" :title="title" allowfullscreen></iframe>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'blog-embed',
		props: ['src', 'title']
	}
</script>