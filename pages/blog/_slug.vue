<template>
	<article>
		<NuxtContent class="article-content" :document="blog"/>
	</article>
</template>

<script>
	import metaSite from '~/utils/metaSite';
	export default {
		layout: 'blog',
		head() {
			return {
				title:  `${this.blog.title} – ${this.$i18n.t('blog.title')} – Derian André`,
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
		async asyncData({ $content, params }) {
			const blog = await $content('blog', params.slug).fetch()
			const [prev, next] = await $content('blog')
				.only(['title', 'slug'])
				.sortBy('createdAt', 'asc')
				.surround(params.slug)
				.fetch();
			console.log(prev);
			return {
				blog,
				prev,
				next
			}
		},
		fetch() {
			this.$store.commit('page/setTitle',    this.blog.title);
			this.$store.commit('page/setSubtitle', this.formatDate(this.blog.date));
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