<template>
	<PageMain class="blog-post">
		<div class="heading" v-text="blog.title" />
		<!-- Info -->
		<PageInfo :title="blog.title" :date="blog.date"/>
		<!-- Content -->
		<PageContent class="content-blog">
			<!-- Article -->
			<article class="article-blog container">
				<NuxtContent class="article article-blog-content" :document="blog"/>
				<BlogBack/>
			</article>
		</PageContent>
	</PageMain>
</template>

<script>
	import metaSite from '~/utils/metaSite';
	export default {
		data() {
			return {
				page: 'blog'
			}
		},
		async asyncData({ $content, params }) {
			const slug = params.slug;
			const blog = await $content('blog', slug).fetch()
			return {
				blog
			}
		},
		head() {
			return {
				title: `${this.blog.title} – ${this.$t(`${this.page}.title`)} – Derian André`,
				bodyAttrs: {
					class: `page page-${this.page}`
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
						content:  this.blog.tags ? this.blog.tags.toString() : 'blog, filosofía, arte, ciencia, relfexión',
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
		computed: {
			meta() {
				const metadata = {
					type:        'article',
					title:       this.blog.title,
					description: this.blog.description,
					hero:        `${this.$config.baseUrl}/_nuxt/assets/img/blog/${this.blog.slug}/${this.blog.hero}`,
					url:         `${this.$config.baseUrl}/es/blog/${this.blog.slug}`
				};
				return metaSite(metadata);
			},
		}
	}
</script>