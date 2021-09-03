<template>
	<NuxtLink class="btn btn-outline-link btn-back" :to="localePath('/blog')">
		<i class="bi bi-arrow-left me-2"></i>
		{{ $t('blog.go_back') }}
	</NuxtLink>
</template>