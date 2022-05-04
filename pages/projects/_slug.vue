<template>
	<PageMain>
		<!-- Head -->
		<Head :page="page" :post="post" />
		<!-- Info -->
		<PageInfo :title="post.title" :subtitle="post.subtitle"/>
		<!-- Content -->
		<PageContent>
			<em class="mb-2 text-low text-italic">
				<Time :date="post.date" />
			</em>
			<NuxtContent :document="post"/>
			<hr>
			<h3>
				{{ $t('projects.sponsor.title') }}
			</h3>
			<p>
				{{ $t('projects.sponsor.description') }}
			</p>
			<div class="hstack gap-3 flex-wrap">
				<a target="_blank" rel="noreferrer nofollow noopener" href="https://github.com/sponsors/derianandre" class="btn btn-outline-link">
					<i class="bi bi-github me-2"></i>
					{{ $t('projects.sponsor.github') }}
				</a>
				<a target="_blank" rel="noreferrer nofollow noopener" href="https://paypal.me/DerianAndre" class="btn btn-outline-link">
					<i class="bi bi-heart-fill me-2"></i>
					{{ $t('projects.sponsor.paypal') }}
				</a>
			</div>
		</PageContent>
		<!-- Side -->
		<PageSide v-if="post.hero">
			<Figure :src="`${page}/${slug}/${post.hero}`" :alt="post.title" />
		</PageSide>
	</PageMain>
</template>

<script>
	export default {
		async asyncData(context) {
			const { $content, app, params } = context,
					page = 'projects',
					slug = params.slug,
					post = await $content(`${page}/${app.i18n.locale}`, slug).fetch();
			return {
				page,
				slug,
				post
			}
		}
	}
</script>