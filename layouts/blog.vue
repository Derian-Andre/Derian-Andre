<template>
	<div class="layout">
		<!-- Header -->
		<Header />
		<main role="main" id="main" class="page blog">
			<!-- Info -->
			<Info :title="title" :subtitle="subtitle" />
			<!-- Content -->
			<section id="content" class="content blog-post">
				<div class="container g-0">
					<!-- Go back to blog -->
					<NuxtLink class="btn btn-outline-link btn-back" to="/blog">
						<i class="bi bi-arrow-left me-2"></i>
						Volver al blog
					</NuxtLink>
					<!-- Article -->
					<Nuxt />
					<!-- Go back to blog -->
					<NuxtLink class="btn btn-outline-link btn-back" to="/blog">
						<i class="bi bi-arrow-left me-2"></i>
						Volver al blog
					</NuxtLink>
				</div>
			</section>
		</main>
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
			},
			subtitle() {
				return this.$store.getters['page/getSubtitle']
			}
		}
	}
</script>