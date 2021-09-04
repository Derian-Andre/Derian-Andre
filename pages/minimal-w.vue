<template>
	<PageMain>
		<!-- Info -->
		<PageInfo :title="$t(`${page}.title`)" :subtitle="$t(`${page}.subtitle`)"/>
		<!-- Content -->
		<PageContent>
			<h2>{{ $t('minimal-w.title') }} <small class="text-muted">v1.1.0</small></h2>
			<p class="lead" v-html="$t('minimal-w.description')" />
			<hr>
			<h3>{{ $t('minimal-w.download.title') }}</h3>
			<p class="mb-4" v-html="$t('minimal-w.download.description')" />
			<a target="_blank" rel="norefer noopener" href="assets/minimal-w/latest.zip" download="minimalw-latest.zip" class="btn btn-outline-link">
				{{ $t('minimal-w.download.url') }}
			</a>
			<hr>
			<h4>{{ $t('minimal-w.donate.title') }}</h4>
			<p class="mb-4" v-html="$t('minimal-w.donate.description')" />
			<a target="_blank" rel="norefer noopener" href="https://paypal.me/DerianAndre" class="btn btn-outline-link">
				{{ $t('minimal-w.donate.url') }}
			</a>
		</PageContent>
		<hr class="d-lg-none">
		<!-- Side -->
		<PageSide class="order-1">
			<Imagen :src="`img/projects/${page}.png`" :alt="$t(`${this.page}.title`)" />
		</PageSide>
	</PageMain>
</template>

<script>
	export default {
		data() {
			return {
				page: 'minimal-w',
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