<template>
	<main role="main" id="main" class="page blog">
		<section id="info" class="info">
			<h1 id="title" class="title"><span>{{ blog.title }}</span></h1>
			<span id="date" class="date">{{ formatDate(blog.date) }}</span>
		</section>
		<!-- Content -->
		<section id="content" class="content">
			<div class="container g-0">
				<!-- Go back to blog -->
				<NuxtLink class="btn btn-outline-link btn-back" to="/blog">
					<i class="bi bi-arrow-left me-2"></i>
					Volver al blog
				</NuxtLink>
				<!-- Article -->
				<article v-if="blog.body">
					<NuxtContent class="d-flex flex-column" :document="blog"/>
				</article>
				<p v-else>Contenido en construcción</p>
				<!-- Go back to blog -->
				<NuxtLink class="btn btn-outline-link btn-back" to="/blog">
					<i class="bi bi-arrow-left me-2"></i>
					Volver al blog
				</NuxtLink>
			</div>
		</section>
	</main>
</template>

<script>
	import metaSite from '~/utils/metaSite';
	export default {
		head() {
			return {
				title:  `${this.blog.title} – Blog – Derian André`,
				bodyAttrs: {
					class: 'blog-post'
				},
				meta: [
					...this.meta,
					{
						property: 'article:published_time',
						content:  this.blog.date,
					},
					{
						property: 'article:modified_time',
						content:  this.blog.updatedAt,
					},
					{
						property: 'article:tag',
						content:  this.blog.tags ? this.blog.tags.toString() : '',
					},
				],
				link: [
					{
						hid: 'canonical',
						rel: 'canonical',
						href: this.$config.baseUrl + this.blog.path,
					},
				],
			};
		},
		async asyncData({ $content, params }) {
			const blog = await $content('blog', params.slug).fetch()
			const [prev, next] = await $content('blog')
				.only(['title', 'slug'])
				.sortBy('createdAt', 'asc')
				.surround(params.slug)
				.fetch();
				
			return {
				blog,
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
				return new Date(date).toLocaleDateString('es', options);
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