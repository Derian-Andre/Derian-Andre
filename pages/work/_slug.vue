<template>
	<PageMain>
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
			<PageConstruction style="margin: auto 0 !important" v-else />
		</PageContent>
		<!-- Side -->
		<PageSide v-if="!post.draft">
			<Figure :src="`${page}/${post.slug}.png`" :alt="post.title" />
			<template v-if="gallery > 1">
				<Figure v-for="i in gallery-1" :key="i" :src="`${page}/${post.slug}-${i+1}.png`" :alt="post.title" />
			</template>
		</PageSide>
	</PageMain>
</template>

<script>
	import metaSite from '~/utils/metaSite';
	export default {
		data() {
			return {
				page: 'work',
				gallery: 1
			}
		},
		head() {
			return {
				title: `${this.post.title} – ${this.$t(`${this.page}.title`)} – Derian André`,
				bodyAttrs: {
					class: `page page-${this.page}`
				}
			}
		},
		async asyncData({ $content, params }) {
			const slug = params.slug;
			const post = await $content('work', slug).fetch();
			const gallery = post.gallery ? post.gallery : 1;
			return {
				post,
				gallery
			}
		},
		computed: {
			meta() {
				const metadata = {
					type:        'article',
					title:       this.page.title,
					description: this.page.description,
					url:         `${this.$config.baseUrl}/${page}/${this.$route.params.slug}`
				};
				return metaSite(metadata);
			}
		}
	}
</script>