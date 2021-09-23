<template>
	<PageMain>
		<!-- Head -->
		<Head :page="page" />
		<!-- Info -->
		<PageInfo :title="$t(`${page}.title`)" :subtitle="$t(`${page}.subtitle`)"/>
		<!-- Content -->
		<PageContent class="content-projects">
			<div class="gallery">
				<ProjectsPost v-for="item in posts" :key="item.slug" :data="item" />
			</div>
		</PageContent>
	</PageMain>
</template>

<script>
	export default {
		async asyncData(context) {
			const { $content, app } = context,
					page = 'projects',
					posts = await $content(`${page}/${app.i18n.locale}`)
						.where({ draft: { $ne: false}, disabled: { $ne: true } })
						.sortBy('date', 'desc')
						.fetch();
			return {
				page,
				posts
			}
		}
	}
</script>