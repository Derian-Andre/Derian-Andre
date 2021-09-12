<template>
	<span v-if="false" />
</template>

<script>
	export default {
		props: {
			// This props will override the computed metaProperty
			title: {
				type: String | Boolean,
				default: false,
			},
			description: {
				type: String | Boolean,
				default: false,
			},
			image: {
				type: String | Boolean,
				default: false,
			},
			type: {
				type: String | Boolean,
				default: 'website',
			},
			// This props are for sub-pages/sub-sections or blogs/articles
			page: {
				type: String | Boolean,
				default: false,
			},
			post: {
				type: Object | Boolean,
				default: false,
			},
		},
		head() {
			return {
				title: this.metaTitle,
				bodyAttrs: {
					class: `page page-${this.page}`
				},
				meta: [
					// Meta
					{ 
						hid: 'description',
						name: 'description',
						content: this.metaDescription 
					},
					// Open Graph
					{
						hid: 'og:title',
						property: 'og:title',
						content: this.metaTitle
					},
					{
						hid: 'og:site_name',
						property: 'og:site_name',
						content: this.metaSiteName
					},
					{
						hid: 'og:description',
						property: 'og:description',
						content: this.metaDescription
					},
					{
						hid: 'og:type',
						property: 'og:type',
						content: this.metaType
					},
					{
						hid: 'og:image',
						property: 'og:image',
						content: this.metaImage
					},
					{
						hid: 'og:image:secure_url',
						property: 'og:image:secure_url',
						content: this.metaImage
					},
					{
						hid: 'og:image:alt',
						property: 'og:image:alt',
						content: this.metaTitle
					},
					// Open Graph: Article
					...this.metaArticle,
					// Twitter
					{
						hid: 'twitter:title',
						name: 'twitter:title',
						content: this.metaTitle
					},
					{
						hid: 'twitter:description',
						name: 'twitter:description',
						content: this.metaDescription
					},
					{
						hid: 'twitter:site',
						name: 'twitter:site',
						content: this.metaTwitterSite
					},
					{
						hid: 'twitter:creator',
						name: 'twitter:creator',
						content: this.metaTwitterCreator
					},
					{
						hid: 'twitter:image',
						name: 'twitter:image',
						content: this.metaImage
					},
					{
						hid: 'twitter:image:alt',
						name: 'twitter:image:alt',
						content: this.metaTitle
					},
				]
			}
		},
		computed: {
			metaBase() {
				return this.$config.baseUrl
			},
			metaSlug() {
				return this.$route.params.slug
			},
			metaLocale() {
				return this.$i18n.locale
			},
			metaTitle() {
				let metaTitle = 'Derian André';
				if(this.page) {
					metaTitle = `${this.$t(`${this.page}.title`)} – ${metaTitle}`;
				}
				if(this.post && this.post.title) {
					metaTitle = `${this.post.title} – ${metaTitle}`;
				}
				// Override
				if(this.title) {
					metaTitle = this.title;
				}
				return metaTitle;
			},
			metaSiteName() {
				return 'Derian André'
			},
			metaDescription() {
				let metaDescription = this.description ? this.description : this.$t('head.description');
				if(this.post && this.post.summary) {
					metaDescription = this.post.summary;
				}
				// Override
				if(this.description) {
					metaDescription = this.description;
				}
				return metaDescription;
			},
			metaUrl() {
				let	metaUrl = `${this.metaBase}/${this.metaLocale}`;
						metaUrl += this.page ? `/${this.page}` : false;
						metaUrl += this.post ? `/${this.metaSlug}` : false;
				return metaUrl;
			},
			metaAuthor() {
				let metaAuthor = 'Derian Castillo';
				if(this.post && this.post.author) {
					metaAuthor = this.post.author;
				}
				return metaAuthor;
			},
			metaImage() {
				let metaImage = require(`~/assets/img/derianandre.png`);
				if(this.post && this.post.hero) {
					metaImage = require(`~/assets/img/${this.page}/${this.metaSlug}/${this.post.hero}`);
				}
				if(this.image) {
					return this.image;
				} else {
					return this.metaBase + metaImage;
				}
			},
			metaType() {
				let metaType = this.type;
				if(this.post) {
					metaType = 'article';
				}
				return metaType;
			},
			metaSection() {
				let metaSection = this.$t(`projects.title`);
				if(this.page) {
					metaSection = this.$t(`${this.page}.title`);
				}
				return metaSection;
			},
			metaPublishedTime() {
				let metaPublishedTime = (new Date()).toJSON();
				if(this.post && (this.post.date || this.post.createdAt)) {
					metaPublishedTime = this.post.date || this.postcreatedAt;
				}
				return metaPublishedTime;
			},
			metaModifiedTime() {
				let metaModifiedTime = (new Date()).toJSON();
				if(this.post && this.post.updatedAt) {
					metaModifiedTime = this.post.updatedAt;
				}
				return metaModifiedTime;
			},
			metaArticle() {
				if(this.metaType === 'article') {
					return [
						{
							hid: 'article:section',
							property: 'article:section',
							content: this.metaSection
						},
						{
							hid: 'article:published_time',
							property: 'article:published_time',
							content: this.metaPublishedTime
						},
						{
							hid: 'article:modified_time',
							property: 'article:modified_time',
							content: this.metaModifiedTime
						},
					]
				} else {
					return [];
				}
			},
			metaTwitterSite() {
				let metaTwitterSite = '@DerianAndre';
				return metaTwitterSite;
			},
			metaTwitterCreator() {
				let metaTwitterCreator = '@DerianAndre';
				if(this.post && this.post.twitter) {
					metaTwitterCreator = this.post.twitter;
				}
				return metaTwitterCreator;
			}
		}
	}
</script>