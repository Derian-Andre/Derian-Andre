<template>
	<PageMain class="gallery">
		<!-- Head -->
		<Head :page="page" />
		<HomePost v-for="item in posts" :key="item.slug" :data="item" />
		<Footer />
	</PageMain>
</template>

<script>
	export default {
		async asyncData ({ $content }) {
			const page = 'home',
					posts = await $content('work')
						.only(['title', 'hero', 'date', 'slug', 'draft', 'disabled'])
						.sortBy('date', 'desc')
						.fetch();
			return {
				page,
				posts
			}
		}
	}
</script>