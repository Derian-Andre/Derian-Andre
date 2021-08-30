<template>
	<div class="layout">
		<Header />
		<main role="main" id="main" class="page blog">
		<section id="info" class="info">
			<h1 id="title" class="title"><span>{{ title }}</span></h1>
		</section>
		<section id="content" class="content">
			<Nuxt />
		</section>
		</main>
		<Footer />
	</div>
</template>

<script>
	export default {
		head() {
			return {
			bodyAttrs: {
				class: 'page blog'
			}
			}
		},
		computed: {
			title() {
			return this.$store.getters['page/getTitle']
			}
		}
	}
</script>