<template>
	<PageMain>
		<!-- Info -->
		<PageInfo :title="project.title" :subtitle="project.subtitle"/>
		<!-- Content -->
		<PageContent>
			<NuxtContent :document="project"/>
			<hr>
			<h3>{{ $t('projects.sponsor.title') }}</h3>
			<p>{{ $t('projects.sponsor.description') }}</p>
			<div class="hstack gap-3 flex-wrap">
				<a target="_blank" rel="noreferrer nofollow noopener" href="https://github.com/sponsors/derianandre" class="btn btn-outline-link">
					<i class="bi bi-github me-2"></i>
					{{ $t('projects.sponsor.github') }}
				</a>
				<a target="_blank" rel="noreferrer nofollow noopener" href="https://paypal.me/DerianAndre" class="btn btn-outline-link">
					<i class="bi bi-heart-fill me-2"></i>
					{{ $t('projects.sponsor.paypal') }}
				</a>
			</div>
		</PageContent>
		<!-- Side -->
		<PageSide class="order-1" v-if="project.hero">
			<Figure :src="`projects/${project.hero}`" :alt="project.title" />
		</PageSide>
	</PageMain>
</template>

<script>
	export default {
		async asyncData(context) {
			const { $content, app, params } = context;
			const slug = params.slug;
			const project = await $content(`projects/${app.i18n.locale}`, slug).fetch();
			return {
				project
			}
		},
		head () {
			return {
				title: `${this.project.title} - ${this.$t('projects.title')} – Derian André`,
				bodyAttrs: {
					class: `page page-${this.project.slug}`
				}
			}
		}
	}
</script>