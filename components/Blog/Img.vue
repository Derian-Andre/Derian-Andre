<template>
	<Figure :src="imgSrc" :inline="inline" :alt="imgAlt" :max-width="maxWidth" :max-height="maxHeight">
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
			imgSrc() {
				return `blog/${this.slug}/${this.src}`;
			},
			imgAlt() {
				return this.alt || this.slug;
			}
		}
	}
</script>