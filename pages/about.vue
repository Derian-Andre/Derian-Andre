<template>
	<PageMain>
		<!-- Head -->
		<Head :page="page" />
		<!-- Info -->
		<PageInfo :title="$t(`${page}.title`)" :subtitle="$t(`${page}.subtitle`)"/>
		<!-- Content -->
		<PageContent class="content-about">
			<p class="h4 fw-light text-low mb-1">Ego sum,</p>
			<h2 class="mb-0">Derian André Castillo Franco</h2>
			<p class="lead" v-html="$t('about.lead')"/>
			<p v-html="$t('about.where')" />
			<hr>
			<h3 class="mb-0">{{ $t('about.summary.title') }}</h3>
			<p v-html="$t('about.summary.content')"/>
			<ul>
				<li v-for="i in 7" :key="i" v-html="$t(`about.summary.list.${i}`)" />
			</ul>
			<hr>
			<h4 class="mb-0">{{ $t('about.more.title') }}</h4>
			<p>{{ $t('about.more.content') }}</p>
			<div class="hstack flex-wrap gap-3 mt-2">
				<NuxtLink class="btn btn-outline-link h6 small text-uppercase px-4 m-0" :to="localePath('/curriculum/')">
					{{ $t('curriculum.title') }}
				</NuxtLink>
				<NuxtLink class="btn btn-outline-link h6 small text-uppercase px-4 m-0" :to="localePath('/projects/')">
					{{ $t('projects.title') }}
				</NuxtLink>
				<a class="btn btn-outline-link h6 small text-uppercase px-5 m-0" href="https://github.com/Derian-Andre/Derian-Andre">
					{{ $t('social.github_repo') }}
				</a>
			</div>
		</PageContent>
		<!-- Side -->
		<PageSide class="order-1">
			<Figure src="ego.jpg" :alt="$t(`${this.page}.title`)" />
		</PageSide>
		<Footer />
	</PageMain>
</template>

<script>
	export default {
		data() {
			return {
				page: 'about'
			}
		},
	}
</script>