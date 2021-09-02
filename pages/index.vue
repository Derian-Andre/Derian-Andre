<template>
	<div role="main" id="gallery" class="gallery">
		<NuxtLink class="post" v-for="project in projects" :key="project.slug" :to="{ name: 'projects-slug', params: { slug: project.slug } }">
			<LazyImage :src="`/assets/img/projects/${project.slug}.png`" :alt="project.title" />
			<div class="overlay">
				<h2 class="title">{{ project.title }}</h2>
				<span class="date">{{ formatDate(project.date) }}</span>
			</div>
		</NuxtLink>
	</div>
</template>

<script>
	import Utils from '~/utils';
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
				return Utils.formatDate(this.$i18n.locale, date);
			}
		},
	}
</script>