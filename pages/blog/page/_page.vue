<template>
	<main role="main" id="main">
		<!-- Info -->
		<PageInfo :title="$t(`${page}.title`)" :subtitle="$t(`${page}.subtitle`)"/>
		<!-- Content -->
		<section id="content" class="content blog-list">
			<h2 class="page-title">
				<template  v-if="pageNumber == 1">
					{{ $t('blog.recent') }}
				</template>
				<template v-else>
					{{ $t('blog.page') + pageNumber }}
				</template>
			</h2>
			<template v-for="(blog, index) in blogs">
				<BlogPost :key="blog.slug" :slug="blog.slug" :title="blog.title" :date="blog.date" />
				<hr v-if="pageNumber === 1 && index == 0" :key="index">
			</template>
			<hr>
			<BlogPagination :total="blogsTotal"/>
		</section>
	</main>
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
					class: `page-${this.page}`
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