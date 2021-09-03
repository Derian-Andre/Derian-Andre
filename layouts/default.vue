<template>
	<div class="layout">
		<!-- Header -->
		<Header />
		<!-- Content -->
		<Nuxt />
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