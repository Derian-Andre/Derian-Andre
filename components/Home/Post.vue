<template>
	<NuxtLink class="item" :to="localePath({ name: 'work-slug', params: { slug: data.slug } })" v-if="show">
		<div class="overlay">
			<h2 class="title">{{ data.title }}</h2>
			<span class="date">{{ date }}</span>
		</div>
		<LazyImg :src="`work/${data.slug}/${hero}`" :alt="data.title" />
	</NuxtLink>
</template>

<script>
	import Utils from '~/utils';
	export default {
		props: ['data'],
		computed: {
			date() {
				return Utils.formatDate(this.$i18n.locale, this.data.date);
			},
			show() {
				let	show = true;
						show = this.data.draft ? false : show,
						show = this.data.disabled ? false : show;
				return show;
			},
			hero() {
				return this.data.hero ? this.data.hero : this.data.slug + '.png';
			}
		}
	}
</script>