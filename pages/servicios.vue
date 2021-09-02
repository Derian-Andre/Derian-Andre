<template>
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
</template>

<script>
	export default {
		data() {
			return {
				services: [
					'design',
					'development',
					'photography'
				]
			}
		},
		head () {
			return {
				title:  `${this.$i18n.t('services.title')} – Derian André`,
			}
		},
		fetch() {
			this.$store.commit('page/setTitle',    this.$i18n.t('services.title'));
			this.$store.commit('page/setSubtitle', this.$i18n.t('services.subtitle'));
		},
	}
</script>