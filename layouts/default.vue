<template>
	<div class="layout">
		<!-- Header -->
		<Header />
		<main role="main" id="main">
			<!-- Info -->
			<PageInfo :title="title" :subtitle="subtitle" v-if="title"/>
			<!-- Content -->
			<Nuxt />
			<!-- Right -->
			<section id="right" class="right hero" v-if="right">
				<img :src="`/assets/img/projects/${project.slug}.png`" :alt="project.title">
			</section>
		</main>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				right: false
			}
		},
		head() {
			return {
				bodyAttrs: {
					class: 'page'
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