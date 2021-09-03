<template>
	<NuxtLink :to="`/blog/${to}`" target="_blank">
		<slot />
	</NuxtLink>
</template>

<script>
	export default {
		props: ['to'],
	}
</script>