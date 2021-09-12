<template>
	<div class="card" v-if="show">
		<LazyImg class="card-img-top" :src="hero" :alt="data.title"/>
		<div class="card-body d-flex flex-column">
			<h3 class="h4 mb-2">{{ data.title }}</h3>
			<em class="m-0 text-low text-italic">{{ date }}</em>
			<hr class="my-4">
			<p class="mt-0 mb-4 text-normal" v-if="data.description" v-html="data.description" />
			<NuxtLink class="btn btn-outline-link stretched-link mt-auto mb-0 small h5 text-uppercase px-2 px-md-4" :to="localePath(`/projects/${data.slug}`)">
				{{ $t('projects.learn_more')}}
			</NuxtLink>
		</div>
	</div>
</template>

<script>
	import Utils from '~/utils';
	export default {
		props: ['data'],
		computed: {
			hero() {
				return this.data.hero ? `projects/${this.data.slug}/${this.data.hero}` : false;
			},
			date() {
				return Utils.formatDate(this.$i18n.locale, this.data.date);
			},
			show() {
				if(this.data.draft) return false;
				if(this.data.disabled) return false;
				return true;
			}
		},
	}
</script>