<template>
	<Imagen :src="`img/blog/${slug}/${src}`" :alt="alt" :width="width" :height="height">
		<slot />
	</Imagen>
</template>
<script>
	export default {
		name: 'blog-img',
		props: ['src', 'alt', 'width', 'height'],
		created() {
			this.slug = this.$route.params.slug;
			console.log(this.slug);
		},
	}
</script>