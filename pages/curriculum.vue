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
					<div class="hstack gap-2">
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
									<CurriculumExperienceItem v-for="item in section.items" :key="item" :name="item" :type="section.slug" />
								</CurriculumExperienceSection>
							</template>
						</div>
						<div class="col">
							<!-- Certifications -->
							<CurriculumExperienceSection name="certifications">
								<template v-for="certification in certifications">
									<Figure :src="`curriculum/${certification.slug}.svg`" max-width="150px"/>
									<CurriculumExperienceExtra type="certifications" v-for="item in certification.items" :key="item.slug" :company="certification.slug" :data="item" />
								</template>
							</CurriculumExperienceSection>
							<!-- Course -->
							<CurriculumExperienceSection name="courses">
								<template v-for="course in courses">
									<Figure :src="`curriculum/${course.slug}.svg`" max-width="150px"/>
									<CurriculumExperienceExtra type="courses" v-for="item in course.items" :key="item.slug" :company="course.slug" :data="item" />
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
						years: 10,
						items: ['adobe-illustrator', 'adobe-photoshop', 'adobe-indesign', 'hitfilm-express', 'figma'],
					}, {
						slug: "frontend",
						years: 4,
						items: ['html5', 'css', 'sass', 'javascript', 'typescript', 'nuxt', 'vue', 'react', 'jquery'],
					}, {
						slug: "backend",
						years: 2,
						items: ['node', 'express', 'mongodb', 'mongoose', 'mysql', 'php', 'python'],
					}, {
						slug: "team",
						years: 4,
						items: ['git', 'github', 'jira', 'bitbucket', 'gitlab', 'slack', 'trello'],
					},
				],
				experience: [
					{
						slug: "jobs",
						items: [
							"blueoptima",
							"xolvex",
							"inbright",
							"derianandre",
						],
					}, {
						slug: "education",
						items: [
							"iteso",
							"cbtis",
						],
					}, {
						slug: "practices",
						items: [
							"cinvestav",
							"casasyterrenos",
						]
					}
				],
				certifications: [
					{
						slug: "hackerrank",
						items: [
							{
								type: "css",
								slug: "css",
								date: "2022-05-25T15:00:00.000Z",
								id: "6ee76af9c694",
								url: "https://www.hackerrank.com/certificates/6ee76af9c694"
							}, {
								type: "javascript",
								slug: "javascript-basic",
								date: "2022-05-25T15:00:00.000Z",
								id: "65c6789e94d0",
								url: "https://www.hackerrank.com/certificates/65c6789e94d0"
							}, {
								type: "javascript",
								slug: "javascript-intermediate",
								date: "2022-05-25T18:00:00.000Z",
								id: "fb3ac1cfe596",
								url: "https://www.hackerrank.com/certificates/fb3ac1cfe596"
							}, {
								type: "troubleshooting",
								slug: "problem-solving-basic",
								date: "2022-05-25T15:00:00.000Z",
								id: "8e534883069e",
								url: "https://www.hackerrank.com/certificates/8e534883069e"
							},
						]
					},
				],
				courses: [
					{
						slug: "frontend-masters",
						items: [
							{
								type: "react",
								slug: "complete-intro-to-react-v7",
								date: "2022-05-27T15:00:00.000Z",
								id: null,
								url: "https://frontendmasters.com/courses/complete-react-v7/"
							}, {
								type: "react",
								slug: "intermediate-react-v4",
								date: "2022-06-01T15:00:00.000Z",
								id: null,
								url: "https://frontendmasters.com/courses/intermediate-react-v4/"
							},  {
								type: "react",
								slug: "pure-react-state",
								date: "2022-06-02T15:00:00.000Z",
								id: null,
								url: "https://frontendmasters.com/courses/pure-react-state/"
							}, {
								type: "css",
								slug: "css-variables",
								date: "2022-06-03T18:30:00.000Z",
								id: null,
								url: "https://frontendmasters.com/courses/css-variables/"
							}
						]
					}
				]
			};
    },
	}
</script>