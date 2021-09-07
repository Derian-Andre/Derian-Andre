<template>
	<PageMain>
		<!-- Info -->
		<PageInfo :title="project.title" :date="project.date" />
		<!-- Content -->
		<PageContent>
			<!-- Project -->
			<article class="article-project" v-if="project.body.children.length > 0 || !project.draft">
				<blockquote v-if="project.working === false">
					<h5 class="mb-2">{{ $t('projects.not_working.title') }}</h5>
					<p v-html="$t('projects.not_working.description')"/>
				</blockquote>
				<NuxtContent class="article-content-project" :document="project"/>
			</article>
			<!-- Draft -->
			<article style="margin: auto 0 !important" v-else>
				<hr class="mt-0">
				<p class="display-1 text-muted mb-4">
					<i class="bi bi-exclamation-triangle"></i>
				</p>
				<h3>{{ $t('projects.construction.title') }}</h3>
				<p class="lead mb-5">
					{{ $t('projects.construction.description') }}
				</p>
				<NuxtLink class="btn btn-outline-link mb-2" :to="localePath('/')">
					{{ $t('projects.go_home') }}
				</NuxtLink>
				<hr>
			</article>
		</PageContent>
		<!-- Side -->
		<PageSide v-if="!project.draft">
			<Imagen :src="`img/projects/${project.slug}.png`" :alt="project.title" />
			<template v-if="gallery > 1">
				<Imagen v-for="i in gallery-1" :key="i" :src="`img/projects/${project.slug}-${i+1}.png`" :alt="project.title" />
			</template>
		</PageSide>
	</PageMain>
</template>

<script>
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
			const slug = params.slug;
			const project = await $content('projects', slug).fetch();
			const gallery = project.gallery ? project.gallery : 1;
			return {
				project,
				gallery
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
			}
		}
	}
</script>