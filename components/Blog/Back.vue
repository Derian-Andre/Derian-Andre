<template>
	<NuxtLink class="btn btn-outline-link btn-back" :to="localePath('/blog')">
		<Icon name="arrow-left" class="me-2"/>
		{{ $t('blog.go_back') }}
	</NuxtLink>
</template>