<template>
	<NuxtLink target="_blank" :to="localePath(`/blog/${to}`)">
		<slot />
	</NuxtLink>
</template>

<script>
	export default {
		name: 'blog-link',
		props: ['to'],
	}
</script>