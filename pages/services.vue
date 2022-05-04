<template>
	<PageMain>
		<!-- Head -->
		<Head :page="page" />
		<!-- Info -->
		<PageInfo :title="$t(`${page}.title`)" :subtitle="$t(`${page}.subtitle`)"/>
		<!-- Content -->
		<PageContent>
			<div class="row row-cols-1 row-cols-md-2 gx-5">
				<template v-for="item in services">
					<section class="col d-flex flex-column" :id="item" :key="item">
						<h3>{{ $t(`services.${item}.title`) }}</h3>
						<p class="lead" v-html="$t(`services.${item}.description`)" />
						<ul class="mb-auto" v-html="$t(`services.${item}.list`)" />
						<hr>
					</section>
				</template>
			</div>
			<a href="mailto:hola@derianandre.com" class="btn btn-outline-link">
				{{ $t('services.cta') }}
			</a>
		</PageContent>
	</PageMain>
</template>

<script>
	export default {
		data() {
			return {
				page: 'services',
				services: [
					'design',
					'development',
					'photography'
				]
			}
		},
		head () {
			return {
				title: `${this.$t(`${this.page}.title`)} – Derian André`,
				bodyAttrs: {
					class: `page page-${this.page}`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-content {
		max-width: 800px !important
	}
</style>