<template>
	<PageMain>
		<!-- Head -->
		<Head :page="page" />
		<!-- Info -->
		<PageInfo :title="$t(`${page}.title`)" :subtitle="$t(`${page}.subtitle`)"/>
		<!-- Content -->
		<PageContent class="content-blog-list">
			<!-- Blog-list Title -->
			<div class="h3 header" v-text="pageNumber == 1 ? $t('blog.recent') : ($t('blog.page') + pageNumber)" />
			<!-- Post -->
			<template v-for="(blog, i) in blogs">
				<BlogPost :key="blog.slug" :slug="blog.slug" :title="blog.title" :date="blog.date"/>
				<hr class="my-3" :key="i" v-if="pageNumber == 1 && i == 0">
			</template>
			<hr>
			<!-- Pagination -->
			<BlogPagination :total="blogsTotal"/>
		</PageContent>
	</PageMain>
</template>

<script>
	import blogContent from '~/utils/blogContent';
	export default {
		async asyncData ({ $content, params, error }) {
			const page = 'blog',
					blogs = await blogContent($content, params, error);
			return {
				page,
				blogs:      blogs.paginatedBlogs,
				blogsTotal: blogs.allBlogs.length,
				pageNumber: params.page
			}
		}
	}
</script>