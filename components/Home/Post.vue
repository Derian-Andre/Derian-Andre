<template>
	<NuxtLink class="item" :to="localePath({ name: 'work-slug', params: { slug: data.slug } })" v-if="show">
		<div class="overlay">
			<h2 class="title">{{ data.title }}</h2>
			<span class="date">{{ formatDate(data.date) }}</span>
		</div>
		<LazyImg :src="`work/${data.slug}.png`" :alt="data.title" />
	</NuxtLink>
</template>

<script>
	import Utils from '~/utils';
	export default {
		props: ['data'],
		computed: {
			show() {
				if(this.data.draft) return false;
				if(this.data.disabled) return false;
				return true;
			}
		},
		methods: {
			formatDate(date) {
				return Utils.formatDate(this.$i18n.locale, date);
			}
		},
	}
</script>