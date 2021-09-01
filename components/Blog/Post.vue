<template>
	<NuxtLink class="post" :to="{ name: 'blog-slug', params: { slug: slug } }">
		<span class="date">{{ formatDate(date) }}</span>
		<h3 class="title">{{ title }}</h3>
	</NuxtLink>
</template>

<script>
	export default {
		props: ['slug', 'title', 'date'],
		methods: {
			formatDate(date) {
				const options = { 
					year:  'numeric',
					month: 'long',
					day:   'numeric'
				}
				return new Date(date).toLocaleDateString(this.$i18n.locale, options);
			}
		},
	}
</script>