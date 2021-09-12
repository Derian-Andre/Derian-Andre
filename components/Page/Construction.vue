<template>
	<article>
		<hr class="mt-0">
		<p class="display-1 text-muted mb-4">
			<i class="bi bi-exclamation-triangle"></i>
		</p>
		<h3>{{ $t('page.construction.title') }}</h3>
		<p class="lead mb-5">
			{{ $t('page.construction.description') }}
		</p>
		<NuxtLink class="btn btn-outline-link mb-2" :to="localePath('/')">
			{{ $t(`${page}.go_home`) }}
		</NuxtLink>
		<hr>
	</article>
</template>

<script>
	export default {
		props: {
			page: {
				type: String,
				default: 'page'
			}
		}
	}
</script>