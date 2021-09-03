<template>
	<main role="main" id="main">
		<!-- Info -->
		<PageInfo :title="blog.title" :subtitle="formatDate(this.blog.date)"/>
		<!-- Content -->
		<section id="content" class="content blog-post">
			<div class="container g-0">
				<BlogBack />
				<!-- Article -->
				<article class="blog">
					<NuxtContent class="article-content" :document="blog"/>
				</article>
				<BlogBack />
			</div>
		</section>
	</main>
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
					class: 'blog'
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