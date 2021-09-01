<template>
	<section id="content" class="content blog-list">
		<h2 class="page-title">
			<template  v-if="page === 1">
				{{ $t('blog.recent') }}
			</template>
			<template v-else>
				{{ $t('blog.page') + page }}
			</template>
		</h2>
		<template v-for="(blog, index) in blogs">
			<BlogPost :key="blog.slug" :slug="blog.slug" :title="blog.title" :date="blog.date" />
			<hr v-if="page === 1 && index == 0" :key="index">
		</template>
		<hr>
		<BlogPagination v-if="blogsTotal > 5" :total="blogsTotal" />
	</section>
</template>

<script>
	import blogContent from '@/utils/blogContent';
	export default {
		head() {
			return {
				title: `${this.$i18n.t('blog.title')} – Derian André`,
				bodyAttrs: {
					class: 'blog'
				}
			}
		},
		async asyncData ({ $content, params, error }) {
			const blogs = await blogContent($content, params, error);
			return {
				page: params.page,
				blogsTotal: blogs.allBlogs.length,
				blogs: blogs.paginatedBlogs
			}
		},
		fetch() {
			this.$store.commit('page/setTitle',		this.$i18n.t('blog.title'));
			this.$store.commit('page/setSubtitle', this.$i18n.t('blog.subtitle'));
		}
	}
</script>