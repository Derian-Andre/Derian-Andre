<template>
	<section :id="`${company.slug}-${data.slug}`" class="mb-4">
		<Figure class="figure-logo" :src="`curriculum/icons/${data.type}.svg`" />
		<h4 class="subtitle" v-if="subtitle">
			{{ subtitle }}
		</h4>
		<h5 class="title" v-if="title">
			{{ title }}
			<small class="opacity-50" v-if="data.id"> [{{ data.id }}] </small>
		</h5>
		<h6 class="date" v-if="date">
			{{ $t(`curriculum.experience.expedition`)}} <Time :date="date" />
		</h6>
		<p class="description" v-if="description" v-html="description" />
		<a
			class="btn btn-outline-link small text-uppercase"
			target="_blank"
			rel="noopener nofollow noreferrer"
			:href="url"
			v-if="url"
		>
			{{ $t(`curriculum.experience.${type}.btn`) }}
			<i class="bi bi-box-arrow-up-right ms-1" />
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
				"react": "Vue.js",
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
			const slug = "" || this.data.id || this.data.slug;
			return this.company.validator + slug;
		},
	},
};
</script>
