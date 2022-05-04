<template>
	<PageMain>
		<!-- Head -->
		<Head :page="page" :post="post" />
		<!-- Info -->
		<PageInfo :title="post.title" :date="post.date" />
		<!-- Content -->
		<PageContent>
			<!-- Post -->
			<article v-if="post.body.children.length > 0 || !post.draft">
				<blockquote v-if="post.working === false">
					<h5 class="mb-2">{{ $t(`${page}.not_working.title`) }}</h5>
					<p v-html="$t(`${page}.not_working.description`)"/>
				</blockquote>
				<NuxtContent class="article article-content-post" :document="post"/>
			</article>
			<!-- Draft -->
			<PageConstruction class="my-auto mx-0" v-else />
		</PageContent>
		<!-- Side -->
		<PageSide v-if="!post.draft">
			<Figure :src="`${page}/${slug}/${hero}`" :alt="post.title" />
			<template v-if="gallery > 1">
				<Figure v-for="i in gallery-1" :key="i" :src="`${page}/${slug}/${slug}-${i+1}.png`" :alt="post.title" />
			</template>
		</PageSide>
	</PageMain>
</template>

<script>
	export default {
		async asyncData({ $content, params }) {
			const page = 'work',
					slug = params.slug,
					post = await $content('work', slug).fetch(),
					hero = post.hero ? post.hero : post.slug + '.png',
					gallery = post.gallery ? post.gallery : 1;
			return {
				page,
				slug,
				post,
				hero,
				gallery
			}
		}
	}
</script>