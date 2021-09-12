<template>
	<PageMain>
		<!-- Info -->
		<PageInfo :title="$t(`${page}.title`)" :subtitle="$t(`${page}.subtitle`)"/>
		<!-- Content -->
		<PageContent class="content-projects">
			<div class="gallery">
				<ProjectsPost v-for="item in projects" :key="item.slug" :data="item" />
			</div>
		</PageContent>
	</PageMain>
</template>

<script>
	export default {
		data() {
			return {
				page: 'projects'
			}
		},
		head () {
			return {
				title: `${this.$t(`${this.page}.title`)} – Derian André`,
				bodyAttrs: {
					class: `page page-${this.page}`
				}
			}
		},
		async asyncData(context) {
			const { $content, app } = context;
			const projects = await $content(`projects/${app.i18n.locale}`)
				.sortBy('date', 'desc')
				.fetch();
			return {
				projects
			}
		}
	}
</script>