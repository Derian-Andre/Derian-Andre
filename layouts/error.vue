<template>
	<main role="main" id="main" class="page error">
		<!-- Info -->
		<PageInfo :title="$t(`${page}.title`)" :subtitle="$t(`${page}.subtitle`)"/>
		<!-- Content -->
		<section id="content" class="content">
			<div v-html="$t(`${page}.content`)"/>
			<p class="display-2">42</p>
			<NuxtLink class="btn btn-outline-link mt-4" :to="localePath('/')">
				{{ $t('error.go_home') }}
			</NuxtLink>
		</section>
		<!-- Right -->
		<section id="right" class="right">
			<span class="emoji">
				<img draggable="false" role="img" alt="🤔" src="https://s.w.org/images/core/emoji/13.1.0/svg/1f914.svg" width="100%">
			</span>
		</section>
	</main>
</template>

<script>
	export default {
		data() {
			return {
				page: 'error'
			}
		},
		head() {
			return {
				title: `${this.$t(`${this.page}.title`)} – Derian André`,
				bodyAttrs: {
					class: `page-${this.page}`
				}
			}
		}
	}
</script>