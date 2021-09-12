<template>
	<PageMain class="page-error">
		<!-- Info -->
		<PageInfo :title="$t(`${page}.title`)" :subtitle="$t(`${page}.subtitle`)"/>
		<!-- Content -->
		<PageContent>
			<div v-html="$t(`${page}.content`)"/>
			<p class="display-2">42</p>
			<NuxtLink class="btn btn-outline-link mt-4" :to="localePath('/')">
				{{ $t('error.go_home') }}
			</NuxtLink>
		</PageContent>
		<!-- Side -->
		<PageSide>
			<Figure src="emoji.svg" inline="true"/>
		</PageSide>
	</PageMain>
</template>

<script>
	export default {
		data() {
			return {
				page: 'error'
			}
		},
		head() {
			return {
				title: `${this.$t(`${this.page}.title`)} – Derian André`,
				bodyAttrs: {
					class: `page-${this.page}`
				}
			}
		}
	}
</script>