<template>
	<div class="layout">
		<!-- Header -->
		<Header />
		<Nuxt />
	</div>
</template>

<script>
	export default {
		head() {
			return {
				bodyAttrs: {
					class: 'project'
				}
			}
		},
	}
</script>