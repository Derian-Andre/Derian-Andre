<template>
	<PageMain>
		<!-- Head -->
		<Head :page="page" />
		<!-- Info -->
		<PageInfo :title="$t(`${page}.title`)" :subtitle="$t(`${page}.subtitle`)"/>
		<!-- Content -->
		<PageContent class="content-curriculum">
			<div class="row">
				<!-- About -->
				<div id="about" class="col about">
					<h2>
						{{ $t('curriculum.about.title') }}
					</h2>
					<p class="intro">
						{{ $t('curriculum.about.lead') }}
					</p>
					<hr>
					<!-- Contact -->
					<CurriculumAboutSection name="contact">
						<ul class="list-unstyled">
							<li v-for="item in contact" :key="item.icon">
								<Icon :name="item.icon" class="me-3"/>
								<a target="_blank" rel="noopener norefereer nofollow" :href="item.url">{{ item.title }}</a>
							</li>
						</ul>
					</CurriculumAboutSection>
					<!-- Specialty -->
					<CurriculumAboutSection name="specialty">
						<h4>
							{{ $t('curriculum.about.specialty.subtitle') }}
						</h4>
					</CurriculumAboutSection>
					<!-- Languages -->
					<CurriculumAboutSection name="languages">
						<template v-for="item in languages">
							<h4 :key="item">
								{{ $t(`curriculum.about.languages.${item}.title`) }}
								<span>
									{{ $t(`curriculum.about.languages.${item}.level`) }}
								</span>
							</h4>
						</template>
					</CurriculumAboutSection>
					<!-- Skills -->
					<CurriculumAboutSection name="skills">
						<CurriculumAboutSkill class="mb-4" v-for="item in skills" :key="item.slug" :data="item"/>
					</CurriculumAboutSection>
				</div>
				<!-- Experiece -->
				<div id="experience" class="col experience">
					<h2>
						{{ $t(`curriculum.experience.title`) }}
					</h2>
					<p class="intro mb-4">
						{{ $t(`curriculum.experience.lead`) }}
					</p>
					<div class="hstack gap-2 flex-wrap">
						<NuxtLink class="btn btn-outline-link small text-uppercase px-4" :to="localePath('/projects/')">
							{{ $t('projects.title') }}
						</NuxtLink>
						<NuxtLink class="btn btn-outline-link small text-uppercase px-4" :to="localePath('/blog/')">
							{{ $t('blog.title') }}
						</NuxtLink>
					</div>
					<hr>
					<div class="row experience">
						<div class="col">
							<template v-for="section in experience">
								<CurriculumExperienceSection :name="section.slug" :key="section.slug">
									<CurriculumExperienceItem v-for="item in section.items" :key="item.slug" :data="item" :type="section.slug" />
								</CurriculumExperienceSection>
							</template>
						</div>
						<div class="col">
							<!-- Certifications -->
							<CurriculumExperienceSection name="certifications">
								<template v-for="certification in certifications">
									<Figure class="figure-logo" :src="`curriculum/${certification.slug}.svg`" max-width="150px"/>
									<CurriculumExperienceExtra type="certifications" v-for="item in certification.items" :key="item.slug" :company="certification" :data="item" />
								</template>
							</CurriculumExperienceSection>
							<!-- Course -->
							<CurriculumExperienceSection name="courses">
								<template v-for="course in courses">
									<Figure class="figure-logo" :src="`curriculum/${course.slug}.svg`" max-width="150px"/>
									<CurriculumExperienceExtra type="courses" v-for="item in course.items" :key="item.slug" :company="course" :data="item" />
								</template>
							</CurriculumExperienceSection>
						</div>
					</div>
				</div>
			</div>
		</PageContent>
	</PageMain>
</template>

<script>
	export default {
    data() {
			return {
				page: "curriculum",
				contact: [
					{
						title: "Zapopan, Jalisco, México",
						icon: "geo-alt-fill",
						url: "https://goo.gl/maps/resBeWvWuGR1VFwB6",
					}, {
						title: "+52 33 1278 1411",
						icon: "phone-fill",
						url: "tel:+523312781411",
					}, {
						title: "hola@derianandre.com",
						icon: "envelope-fill",
						url: "mailto:hola@derianandre.com",
					}, {
						title: "Github",
						icon: "github",
						url: "http://github.com/derianandre",
					}, {
						title: "Linkedin",
						icon:	"linkedin",
						url:	"http://linkedin.com/in/derianandre",
					},
				],
				languages: [
					"spanish",
					"english",
				],
				skills: [
					{
						slug: "design",
						years: 7,
						items: ['adobe-illustrator', 'adobe-photoshop', 'adobe-indesign', 'hitfilm-express', 'figma'],
					}, {
						slug: "frontend",
						years: 5,
						items: ['javascript', 'react', 'next', 'vue', 'nuxt', 'html', 'css', 'sass', 'typescript', 'jest', 'bootstrap', 'jquery'],
					}, {
						slug: "backend",
						years: 2,
						items: ['node', 'express', 'mongodb', 'mongoose', 'mysql',],
					}, {
						slug: "team",
						years: 4,
						items: ['git', 'github', 'jira', 'bitbucket', 'confluence', 'gitlab', 'discord', 'slack', 'trello', 'meistertask'],
					},
				],
				experience: [
					{
						slug: "jobs",
						items: [
							{
								slug: "blueoptima",
								dateEnd: "2023-01-14T12:00:00.000Z",
								dateStart: "2022-05-16T09:00:00.000Z",
								stack: ['javascript', 'react', 'jest', 'angular', 'html', 'sass', 'css', 'jira', 'bitbucket', 'confluence', 'figma']
							}, {
								slug: "xolvex",
								dateEnd: "2022-05-13T18:00:00.000Z",
								dateStart: "2019-01-03T10:00:00.000Z",
								stack: ['javascript', 'vue', 'nuxt', 'html', 'sass', 'css', 'github', 'adobe-illustrator', 'adobe-photoshop', 'adobe-indesign', 'hitfilm-express', 'figma', 'slack', 'trello',]
							}, {
								slug: "inbright",
								dateEnd: "2019-01-01T10:00:00.000Z",
								dateStart: "2018-11-23T10:00:00.000Z",
								stack: ['javascript', 'vue', 'nuxt', 'html', 'sass', 'css', 'github', 'adobe-illustrator', 'adobe-photoshop', 'adobe-indesign', 'hitfilm-express', 'figma', 'discord', 'slack', 'trello', 'meistertask']
							}, {
								slug: "derianandre",
								dateEnd: null,
								dateStart: "2015-04-08T09:00:00.000Z",
								stack: ['javascript', 'react', 'next', 'vue', 'nuxt', 'html', 'sass', 'css', 'node', 'express', 'mongoose', 'mongodb', 'mysql', 'php', 'git', 'github', 'gitlab', 'bitbucket', 'discord', 'adobe-illustrator', 'adobe-photoshop', 'adobe-indesign', 'hitfilm-express', 'figma']
							},
						],
					}, {
						slug: "education",
						items: [
							{
								slug: "iteso",
								dateEnd: "2018-12-06T10:00:00.000Z",
								dateStart: "2013-08-01T18:00:00.000Z",
								stack: ['ssh', 'php', 'python', 'html', 'css', 'mysql', 'c']
							}, {
								slug: "cbtis",
								dateEnd: "2013-07-05T10:00:00.000Z",
								dateStart: "2010-08-02T18:00:00.000Z",
								stack: ['c']
							},
						],
					}, {
						slug: "practices",
						items: [
							{ slug: "cinvestav",
								dateEnd: "2018-12-03T18:00:00.000Z",
								dateStart: "2018-05-13T08:00:00.000Z",
								stack: ['javascript', 'html', 'sass', 'php',]
							}, {
								slug: "casasyterrenos",
								dateEnd: "2018-05-10T18:00:00.000Z",
								dateStart: "2018-01-01T08:00:00.000Z",
								stack: ['ssh', 'python', 'mysql', 'mongodb']
							},
						]
					}
				],
				certifications: [
					{
						slug: "hackerrank",
						home: "https://hackerrank.com/",
						validator: "https://hackerrank.com/certificates/",
						items: [
							{
								type: "javascript",
								slug: "javascript-basic",
								date: "2022-05-25T15:00:00.000Z",
								id: "65c6789e94d0",
							}, {
								type: "javascript",
								slug: "javascript-intermediate",
								date: "2022-05-25T18:00:00.000Z",
								id: "fb3ac1cfe596",
							}, {
								type: "node",
								slug: "node-intermediate",
								date: "2023-01-17T18:00:00.000Z",
								id: "e54592a5f6ac",
							},  {
								type: "react",
								slug: "react-basic",
								date: "2022-08-25T18:00:00.000Z",
								id: "b076b0edec7f",
							}, {
								type: "css",
								slug: "css",
								date: "2022-05-25T15:00:00.000Z",
								id: "6ee76af9c694",
							}, {
								type: "troubleshooting",
								slug: "problem-solving-basic",
								date: "2022-05-25T15:00:00.000Z",
								id: "8e534883069e",
							}, {
								type: "troubleshooting",
								slug: "problem-solving-intermediate",
								date: "2022-05-31T15:00:00.000Z",
								id: "e54592a5f6ac",
							},
						]
					}, {
						slug: "udemy",
						home: "https://udemmy.com/",
						validator: "https://udemy.com/certificate/",
						items: [
							{
								type: "typescript",
								slug: "typescript-guia-completa",
								date: "2023-01-25T19:00:00.000Z",
								id: "UC-e8fb2cff-ebc4-409f-9411-be051374f9fe",
							}, {
								type: "troubleshooting",
								slug: "principios-solid-y-clean-code",
								date: "2023-01-31T19:00:00.000Z",
								id: "UC-517b49e2-905a-4b4c-9f5e-7d311a735765",
							},
						]
					},
				],
				courses: [
					{
						slug: "frontend-masters",
						home: "https://frontendmasters.com/",
						validator: "https://frontendmasters.com/courses/",
						items: [
							{
								type: "javascript",
								slug: "js-fundamentals-functional-v2",
								date: "2022-06-14T15:00:00.000Z",
								author: "Bianca Gandolfo",
								id: null,
							}, {
								type: "javascript",
								slug: "javascript-hard-parts-v2",
								date: "2022-06-22T15:00:00.000Z",
								author: "Will Sentance",
								id: null,
							}, {
								type: "javascript",
								slug: "deep-javascript-v3",
								date: "2022-07-01T15:00:00.000Z",
								author: "Kyle Simpson",
								id: null,
							}, {
								type: "javascript",
								slug: "js-recent-parts",
								date: "2022-07-12T15:00:00.000Z",
								author: "Kyle Simpson",
								id: null,
							},  {
								type: "javascript",
								slug: "javascript-new-hard-parts",
								date: "2022-07-14T15:00:00.000Z",
								author: "Will Sentance",
								id: null,
							}, {
								type: "react",
								slug: "complete-intro-to-react-v7",
								date: "2022-05-27T15:00:00.000Z",
								author: "Brian Holt",
								id: null,
							}, {
								type: "react",
								slug: "intermediate-react-v4",
								date: "2022-06-01T15:00:00.000Z",
								author: "Brian Holt",
								id: null,
							},  {
								type: "react",
								slug: "pure-react-state",
								date: "2022-06-02T15:00:00.000Z",
								author: "Steve Kinney",
								id: null,
							}, {
								type: "css",
								slug: "css-variables",
								date: "2022-06-03T18:30:00.000Z",
								author: "Lea Verou",
								id: null,
							}, {
								type: "vscode",
								slug: "customize-vs-code",
								date: "2022-07-01T15:00:00.000Z",
								author: "Burke Holland",
								id: null,
							}
						],
					}, {
						slug: "udemy",
						home: "https://udemy.com/",
						validator: "https://udemy.com/courses/",
						items: [
							{
								type: "typescript",
								slug: "typescript-guia-completa",
								date: "2023-01-25T19:00:00.000Z",
								author: "Fernando Herrera",
								id: null,
							}, {
								type: "troubleshooting",
								slug: "principios-solid-y-clean-code",
								date: "2023-01-31T19:00:00.000Z",
								author: "Fernando Herrera",
								id: null,
							},
						],
					}
				]
			};
    },
	}
</script>