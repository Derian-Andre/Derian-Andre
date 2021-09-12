<template>
	<a :href="to" :target="target" :rel="rel">
		<slot />
	</a>
</template>

<script>
	export default {
		name: 'blog-ext',
		props: {
			to: {
				type: String,
				default: '#'
			},
			target: {
				type: String | Boolean,
				default: '_blank'
			},
			rel: {
				type: String | Boolean,
				default: 'nofollow noopener noreferrer'
			}
		},
	}
</script>