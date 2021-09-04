<template>
	<PageMain class="blog-post">
		<div class="heading" v-text="blog.title" />
		<!-- Info -->
		<PageInfo :title="blog.title" :subtitle="formatDate(this.blog.date)"/>
		<!-- Content -->
		<PageContent class="blog-content">
			<!-- Article -->
			<article class="article-blog container">
				<NuxtContent class="article-blog-content" :document="blog"/>
			</article>
		</PageContent>
	</PageMain>
</template>

<script>
	import Utils from '~/utils';
	import metaSite from '~/utils/metaSite';
	export default {
		data() {
			return {
				page: 'blog'
			}
		},
		async asyncData({ $content, params }) {
			const blog = await $content('blog', params.slug)
				.fetch()
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