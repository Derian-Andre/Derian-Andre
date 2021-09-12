<template>
	<PageMain class="gallery">
		<HomePost v-for="item in work" :key="item.slug" :data="item" />
		<Footer />
	</PageMain>
</template>

<script>
	export default {
		data() {
			return {
				page: 'home'
			}
		},
		head() {
			return {
				title: `Derian André – Freelancer Fullstack Designer`,
				bodyAttrs: {
					class: `page page-${this.page}`
				}
			}
		},
		async asyncData ({ $content }) {
			const work = await $content('work')
				.only(['title', 'date', 'slug', 'draft', 'disabled'])
				.sortBy('date', 'desc')
				.fetch();
			return {
				work
			}
		}
	}
</script>