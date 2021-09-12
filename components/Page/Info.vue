<template>
	<section id="page-info" class="page-info">
		<h1 class="title" v-if="title">
			<span v-html="title" />
		</h1>
		<div class="subtitle" v-if="subtitle || date" v-text="text" />
	</section>
</template>

<script>
	import Utils from '~/utils';
	export default {
		props: ['title', 'subtitle', 'date'],
		computed: {
			text() {
				return this.date ? Utils.formatDate(this.$i18n.locale, this.date) : this.subtitle;
			}
		}
	}
</script>