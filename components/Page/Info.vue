<template>
	<section id="page-info" class="page-info">
		<h1 class="title" v-if="title">
			<span v-html="title" />
		</h1>
		<div class="subtitle" v-if="subtitle || date" v-text="date ? formatedDate : subtitle" />
	</section>
</template>

<script>
	import Utils from '~/utils';
	export default {
		props: ['title', 'subtitle', 'date'],
		methods: {
			formatDate(date) {
				return Utils.formatDate(this.$i18n.locale, date);
			}
		},
		computed: {
			formatedDate() {
				return this.formatDate(this.date);
			}
		}
	}
</script>