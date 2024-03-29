<template>
	<section :id="`${company.slug}-${data.slug}`" class="mb-4">
		<div class="d-flex mb-1">
			<Figure class="figure-logo figure-small" :src="`curriculum/icons/${data.type}.svg`" />
			<h5 class="title mb-0" v-if="title">
				{{ title }}
				<small class="opacity-50" v-if="data.id"> [{{ data.id }}] </small>
			</h5>
		</div>
		<h6 class="date mb-1" v-if="date">
			{{ $t(`curriculum.experience.expedition`) }} <Time :date="date" />
		</h6>
		<p class="description mb-2" v-if="description" v-html="description" />
		<a class="btn btn-outline-link btn-external btn-sm text-uppercase" target="_blank" rel="noopener nofollow noreferrer"
			:href="url" v-if="url">
			{{ $t(`curriculum.experience.${type}.btn`) }}
			<i class="bi bi-caret-right-fill ms-1" />
		</a>
	</section>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			required: true,
		},
		company: {
			type: Object,
			required: true,
		},
		data: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			stack: {
				"javascript": "JavaScript",
				"typescript": "TypeScript",
				"react": "React.js",
				"vue": "Vue.js",
				"node": "Node.js",
				"nest": "Nest.js",
				"html": "HTML",
				"css": "CSS",
				"git": "Git",
				"python": "Python",
				"sql": "SQL",
				"php": "PHP",
				"c": "C",
				"c++": "C++",
				"vscode": "Visual Studio Code",
				"troubleshooting": "Trouble Shooting",
				"power-bi": "Power BI"
			},
		};
	},
	computed: {
		companyName() {
			return this.$t(
				`curriculum.experience.${this.type}.items.${this.company.slug}.title`
			);
		},
		title() {
			return this.$t(
				`curriculum.experience.${this.type}.items.${this.company.slug}.items.${this.data.slug}.title`
			);
		},
		subtitle() {
			return this.$t(`curriculum.experience.${this.type}.of`, [this.stack[this.data.type]]);
		},
		date() {
			return this.data.date
		},
		description() {
			return this.$t(
				`curriculum.experience.${this.type}.items.${this.company.slug}.items.${this.data.slug}.description`
			);
		},
		home() {
			return this.company.home;
		},
		url() {
			if (this.data.url === null) return null;
			const slug = "" || this.data.id || this.data.slug;
			return this.company.validator + slug;
		},
	},
};
</script>
