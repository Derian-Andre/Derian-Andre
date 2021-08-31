<template>
	<section id="content" class="content blog-list">
		<h2 class="page-title">{{ $t('blog.recent') }}</h2>
		<template v-for="(blog, index) in blogs">
			<NuxtLink class="post" :key="blog.slug" :to="{ name: 'blog-slug', params: { slug: blog.slug } }" :title="blog.title">
				<span class="date">{{ formatDate(blog.date) }}</span>
				<h3 class="title">{{ blog.title }}</h3>
			</NuxtLink>
			<hr v-if="index == 0" :key="index">
		</template>
		<hr>
		pagination
	</section>
</template>

<script>
	export default {
		head() {
			return {
				title: `${this.$i18n.t('blog.title')} – Derian André`,
				bodyAttrs: {
					class: 'blog'
				}
			}
		},
		async asyncData ({ $content }) {
			const blogs = await $content('blog')
				.only(['title', 'date', 'slug'])
				.sortBy('date', 'desc')
				.fetch();
			return {
				blogs
			}
		},
		fetch() {
			this.$store.commit('page/setTitle',		this.$i18n.t('blog.title'));
			this.$store.commit('page/setSubtitle', this.$i18n.t('blog.subtitle'));
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