<template>
	<PageMain>
		<!-- Info -->
		<PageInfo :title="project.title" :subtitle="formatDate(project.date)"/>
		<!-- Content -->
		<PageContent>
			<!-- Project -->
			<article class="article-project" v-if="project.body">
				<NuxtContent class="article-content-project" :document="project"/>
			</article>
			<p v-else>Contenido en construcción</p>
		</PageContent>
		<!-- Side -->
		<PageSide>
			<Imagen :src="`img/projects/${project.slug}.png`" :alt="project.title" />
			<template v-if="gallery > 1">
				<Imagen v-for="i in gallery-1" :key="i" :src="`img/projects/${project.slug}-${i+1}.png`" :alt="project.title" />
			</template>
		</PageSide>
	</PageMain>
</template>

<script>
	import Utils from '~/utils';
	import metaSite from '~/utils/metaSite';
	export default {
		data() {
			return {
				page: 'projects',
				gallery: 1
			}
		},
		head() {
			return {
				title: `${this.project.title} – ${this.$t(`${this.page}.title`)} – Derian André`,
				bodyAttrs: {
					class: `page page-${this.page}`
				}
			}
		},
		async asyncData({ $content, params }) {
			const project = await $content('projects', params.slug).fetch()
			return {
				project,
				gallery: project.gallery ? project.gallery : 1
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