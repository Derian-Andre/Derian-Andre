<template>
	<main role="main" id="main">
		<!-- Info -->
		<PageInfo :title="$t(`${page}.title`)" :subtitle="$t(`${page}.subtitle`)"/>
		<!-- Content -->
		<section id="content" class="content">
			<template v-for="item, index in services">
				<section :id="item" :key="item">
					<h2 class="mb-4">{{ $t(`services.${item}.title`) }}</h2>
					<p v-html="$t(`services.${item}.description`)" />
					<ul v-html="$t(`services.${item}.list`)" />
				</section>
				<hr :key="index">
			</template>
			<a href="mailto:hola@derianandre.com" class="btn btn-outline-link">
				{{ $t('services.cta') }}
			</a>
		</section>
	</main>
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
					class: `page-${this.page}`
				}
			}
		}
	}
</script>