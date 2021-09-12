<template>
	<NuxtLink class="post" :to="localePath({ name: 'blog-slug', params: { slug: slug } })">
		<h3 class="title" v-text="title"/>
		<h4 class="date" v-text="formatedDate" />
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