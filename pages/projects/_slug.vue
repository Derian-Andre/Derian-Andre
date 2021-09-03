<template>
	<main role="main" id="main">
		<!-- Info -->
		<PageInfo :title="project.title" :subtitle="formatDate(project.date)"/>
		<!-- Content -->
		<section id="content" class="content">
			<!-- Project -->
			<article class="project" v-if="project.body">
				<NuxtContent :document="project"/>
			</article>
			<p v-else>Contenido en construcción</p>
		</section>
		<!-- Right -->
		<section id="right" class="right hero">
			<img :src="`/assets/img/projects/${project.slug}.png`" :alt="project.title">
		</section>
	</main>
</template>

<script>
	import Utils from '~/utils';
	import metaSite from '~/utils/metaSite';
	export default {
		data() {
			return {
				page: 'projects'
			}
		},
		head() {
			return {
				title: `${this.project.title} – ${this.$t(`${this.page}.title`)} – Derian André`,
				bodyAttrs: {
					class: `page-${this.page}`
				}
			}
		},
		async asyncData({ $content, params }) {
			const project = await $content('projects', params.slug).fetch()
			return {
				project
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
		methods: {
			formatDate(date) {
				return Utils.formatDate(this.$i18n.locale, date);
			}
		}
	}
</script>