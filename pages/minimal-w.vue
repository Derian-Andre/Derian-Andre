<template>
	<section id="content" class="content">
		<h2 class="mb-4">{{ $t('minimal-w.title') }} <small class="text-muted">v1.1.0</small></h2>
		<p v-html="$t('minimal-w.description')" />
		<hr>
		<h3 class="mb-4">{{ $t('minimal-w.download.title') }}</h3>
		<p class="mb-4" v-html="$t('minimal-w.download.description')" />
		<a target="_blank" rel="norefer noopener" href="https://paypal.me/DerianAndre" class="btn btn-outline-link">
			{{ $t('minimal-w.download.url') }}
		</a>
		<hr>
		<h4 class="mb-4">{{ $t('minimal-w.donate.title') }}</h4>
		<p class="mb-4" v-html="$t('minimal-w.donate.description')" />
		<a target="_blank" rel="norefer noopener" href="https://paypal.me/DerianAndre" class="btn btn-outline-link">
			{{ $t('minimal-w.donate.url') }}
		</a>
	</section>
</template>

<script>
	export default {
		head () {
			return {
				title:  `${this.$i18n.t('services.title')} – Derian André`,
			}
		},
		fetch() {
			this.$store.commit('page/setTitle',		this.$i18n.t('minimal-w.title'));
			this.$store.commit('page/setSubtitle',	this.$i18n.t('minimal-w.subtitle'));
		},
	}
</script>