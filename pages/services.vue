<template>
	<main role="main" id="main">
		<!-- Info -->
		<PageInfo :title="$t(`${page}.title`)" :subtitle="$t(`${page}.subtitle`)"/>
		<!-- Content -->
		<section id="content" class="content" style="max-width: 800px !important">
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
			<a href="mailto:hola@derianandre.com" class="btn btn-outline-link align-self-start px-5">
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