<template>
	<article>
		<NuxtContent class="article-content" :document="blog"/>
	</article>
</template>

<script>
	import Utils from '~/utils';
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
			return {
				blog
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
				return Utils.formatDate(this.$i18n.locale, date);
			}
		}
	}
</script>