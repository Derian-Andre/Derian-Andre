<template>
	<section id="info" class="info">
		<h1 id="title" class="title" v-if="title"><span>{{ title }}</span></h1>
		<span id="subtitle" class="subtitle" v-if="subtitle">{{ subtitle }}</span>
	</section>
</template>

<script>
	export default {
		props: ['title', 'subtitle']	
	}
</script>