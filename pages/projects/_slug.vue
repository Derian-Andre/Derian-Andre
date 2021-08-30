<template>
	<main role="main" id="main" class="page">
		<section id="info" class="info">
			<h1 id="title" class="title"><span>{{ project.title }}</span></h1>
			<span id="date" class="date">{{ formatDate(project.date) }}</span>
		</section>
		<!-- Content -->
		<section id="content" class="content">
			<article v-if="project.body">
				<NuxtContent :document="project"/>
			</article>
			<p v-else>Contenido en construcción</p>
		</section>
		<!-- Right -->
		<section id="right" class="right hero">
			<img :src="`/assets/img/projects/${project.slug}.png`" :alt="project.title">
		</section>
	</main>
</template>

<script>
	export default {
		head() {
			return {
				bodyAttrs: {
					class: 'projects'
				}
			}
		},
		async asyncData({ $content, params }) {
			const project = await $content('projects', params.slug).fetch()

			const [prev, next] = await $content('projects')
				.only(['title', 'slug'])
				.sortBy('createdAt', 'asc')
				.surround(params.slug)
				.fetch();

			return {
				project,
				prev,
				next
			}
		},
		methods: {
			formatDate(date) {
				const options = { 
					year:  'numeric',
					month: 'long',
					day:   'numeric'
				}
				return new Date(date).toLocaleDateString('es', options);
			}
		},
	}
</script>