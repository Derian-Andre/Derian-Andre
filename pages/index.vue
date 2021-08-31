<template>
	<div role="main" class="gallery">
		<NuxtLink class="post" v-for="project in projects" :key="project.slug" :title="project.title" :to="{ name: 'projects-slug', params: { slug: project.slug } }">
			<LazyImage :src="`/assets/img/projects/${project.slug}.png`" :alt="project.title" />
			<div class="overlay">
				<h2 class="title">{{ project.title }}</h2>
				<span class="date">{{ formatDate(project.date) }}</span>
			</div>
		</NuxtLink>
	</div>
</template>

<script>
	export default {
		layout: 'home',
		head() {
			return {
				title:  `${this.$i18n.t('home.title')} – Derian André`,
				bodyAttrs: {
					class: 'home'
				}
			}
		},
		async asyncData ({ $content }) {
			const projects = await $content('projects')
				.only(['title', 'date', 'slug'])
				.sortBy('date', 'desc')
				.fetch();
			return {
				projects
			}
		},
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