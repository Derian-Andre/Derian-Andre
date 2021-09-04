<template>
	<PageMain>
		<!-- Info -->
		<PageInfo :title="$t(`${page}.title`)" :subtitle="$t(`${page}.subtitle`)"/>
		<!-- Content -->
		<PageContent class="blog-list">
			<!-- Blog-list Title -->
			<div class="h3 header" v-text="pageNumber == 1 ? $t('blog.recent') : ($t('blog.page') + pageNumber)" />
			<!-- Post -->
			<BlogPost v-for="blog in blogs" :key="blog.slug" :slug="blog.slug" :title="blog.title" :date="blog.date" />
			<hr>
			<!-- Pagination -->
			<BlogPagination :total="blogsTotal"/>
		</PageContent>
	</PageMain>
</template>

<script>
	import blogContent from '@/utils/blogContent';
	export default {
		data() {
			return {
				page: 'blog'
			}
		},
		head() {
			return {
				title: `${this.$t(`${this.page}.page`) + this.pageNumber} – ${this.$t(`${this.page}.title`)} – Derian André`,
				bodyAttrs: {
					class: `page page-${this.page}`
				}
			}
		},
		async asyncData ({ $content, params, error }) {
			const blogs = await blogContent($content, params, error);
			return {
				pageNumber: params.page,
				blogsTotal: blogs.allBlogs.length,
				blogs:      blogs.paginatedBlogs
			}
		}
	}
</script>