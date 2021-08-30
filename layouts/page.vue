<template>
	<div class="layout">
		<Header />
		<main role="main" id="main" class="page">
			<section id="info" class="info">
			<h1 id="title" class="title"><span>{{ title }}</span></h1>
			<span id="subtitle" class="subtitle" v-if="subtitle">{{ subtitle }}</span>
			</section>
			<Nuxt />
		</main>
		<Footer />
	</div>
</template>

<script>
	export default {
		computed: {
			title() {
			return this.$store.getters['page/getTitle']
			},
			subtitle() {
			return this.$store.getters['page/getSubtitle']
			}
		}
	}
</script>