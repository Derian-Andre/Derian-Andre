<template>
	<section ref="page-info" id="page-info" class="page-info">
		<h1 class="title" v-if="title">
			<span v-html="title" />
		</h1>
		<div class="subtitle" v-if="subtitle || date">
			<template v-if="date">
				<Time :date="date" />
			</template>
			<template v-else>
				{{ subtitle }}
			</template>
		</div>
	</section>
</template>

<script>
	import Utils from '~/utils';
	export default {
		props: ['title', 'subtitle', 'date'],
		computed: {
			formatedDate() {
				return Utils.formatDate(this.$i18n.locale, this.date);
			}
		}
	}
</script>