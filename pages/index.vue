<template>
	<PageMain class="gallery">
		<template v-for="project in projects">
			<NuxtLink class="post" :key="project.slug" :to="localePath({ name: 'projects-slug', params: { slug: project.slug } })" v-if="!project.draft && !project.disabled">
				<LazyImg :src="`/assets/img/projects/${project.slug}.png`" :alt="project.title" />
				<div class="overlay">
					<h2 class="title">{{ project.title }}</h2>
					<span class="date">{{ formatDate(project.date) }}</span>
				</div>
			</NuxtLink>
		</template>
	</PageMain>
</template>

<script>
	import Utils from '~/utils';
	export default {
		layout: 'home',
		data() {
			return {
				page: 'home'
			}
		},
		head() {
			return {
				title: `${this.$t(`${this.page}.title`)} – Derian André – Freelancer Fullstack Designer.`,
				bodyAttrs: {
					class: `page page-${this.page}`
				}
			}
		},
		async asyncData ({ $content }) {
			const projects = await $content('projects')
				.only(['title', 'date', 'slug', 'draft'])
				.sortBy('date', 'desc')
				.fetch();
			return {
				projects
			}
		},
		methods: {
			formatDate(date) {
				return Utils.formatDate(this.$i18n.locale, date);
			}
		},
	}
</script>