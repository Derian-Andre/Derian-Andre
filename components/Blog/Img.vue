<template>
	<Figure :src="`blog/${slug}/${src}`" :inline="inline" :alt="imgAlt" :max-width="maxWidth" :max-height="maxHeight">
		<slot />
	</Figure>
</template>
<script>
	export default {
		name: 'blog-img',
		props: {
			src: String,
			alt: String,
			inline: {
				type: Boolean,
				default: true
			},
			maxWidth: String,
			maxHeight: String,
		},
		computed: {
			slug() {
				return this.$route.params.slug;
			},
			imgAlt() {
				return this.alt || this.slug;
			}
		}
	}
</script>