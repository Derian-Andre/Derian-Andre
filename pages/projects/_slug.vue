<template>
	<main role="main" id="main">
		<!-- Info -->
		<Info :title="project.title" :subtitle="formatDate(project.date)" />
		<!-- Content -->
		<section id="content" class="content">
			<article v-if="project.body">
				<NuxtContent :document="project"/>
			</article>
			<p v-else>Contenido en construcción</p>
		</section>
		<!-- Right -->
		<section id="right" class="right hero" v-if="project.slug">
			<img :src="`/assets/img/projects/${project.slug}.png`" :alt="project.title">
		</section>
	</main>
</template>

<script>
	export default {
		layout: 'project',
		head() {
			return {
				title: `${this.project.title} – ${this.$i18n.t('projects.title')} – Derian André`,
				bodyAttrs: {
					class: 'projects'
				}
			}
		},
		async asyncData({ $content, params }) {
			const project = await $content('projects', params.slug).fetch()

			const [prev, next] = await $content('projects')
				.only(['title', 'slug'])
				.sortBy('createdAt', 'asc')
				.surround(params.slug)
				.fetch();

			return {
				project,
				prev,
				next
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
		computed: {
			meta() {
				const metadata = {
					type:        'article',
					title:       this.blog.title,
					description: this.blog.description,
					url:         `${this.$config.baseUrl}/blog/${this.$route.params.slug}`
				};
				return metaSite(metadata);
			},
		},
	}
</script>