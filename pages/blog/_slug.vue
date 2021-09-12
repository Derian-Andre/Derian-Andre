<template>
	<PageMain class="blog-post">
		<!-- Head -->
		<Head :page="page" />
		<!-- Heading -->
		<BlogHeading :title="post.title" />
		<!-- Info -->
		<PageInfo :title="post.title" :date="post.date"/>
		<!-- Content -->
		<PageContent class="content-blog">
			<!-- Article -->
			<article class="article-blog container">
				<NuxtContent class="article article-blog-content" :document="post"/>
				<BlogBack/>
			</article>
		</PageContent>
	</PageMain>
</template>

<script>
	export default {
		async asyncData({ $content, params }) {
			const page = 'blog',
					slug = params.slug,
					post = await $content('blog', slug).fetch();
			return {
				page,
				slug,
				post
			}
		}
	}
</script>