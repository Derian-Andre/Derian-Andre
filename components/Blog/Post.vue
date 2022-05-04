<template>
	<NuxtLink class="post" :to="localePath({ name: 'blog-slug', params: { slug: slug } })">
		<h3 class="title">
			{{ title }}
		</h3>
		<h4 class="date">
			<Time :date="date" />
		</h4>
	</NuxtLink>
</template>

<script>
	import Utils from '~/utils';
	export default {
		props: ['slug', 'title', 'date'],
		computed: {
			formatedDate() {
				return Utils.formatDate(this.$i18n.locale, this.date);
			}
		}
	}
</script>