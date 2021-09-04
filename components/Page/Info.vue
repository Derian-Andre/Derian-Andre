<template>
	<section id="page-info" class="page-info">
		<h1 class="title" v-if="title">
			<span v-html="title" />
		</h1>
		<h2 class="subtitle" v-if="subtitle">
			{{ subtitle }}
		</h2>
	</section>
</template>

<script>
	export default {
		props: ['title', 'subtitle']
	}
</script>