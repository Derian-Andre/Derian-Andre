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
							<li>
								<Icon name="geo-alt-fill" class="me-3"/>
								<a target="_blank" rel="noopener norefereer nofollow" href="https://goo.gl/maps/resBeWvWuGR1VFwB6">{{ $t('curriculum.about.contact.address') }}</a>
							</li>
							<li>
								<Icon name="phone-fill" class="me-3"/>
								<a target="_blank" rel="noopener noreferrer nofollow" href="tel:+523312781411">+52 33 1278 1411</a>
							</li>
							<li>
								<Icon name="envelope-fill" class="me-3"/>
								<a target="_blank" rel="noopener noreferrer nofollow" href="mailto:hola@derianandre.com">hola@derianandre.com</a>
							</li>
							<li>
								<Icon name="github" class="me-3"/>
								<a target="_blank" rel="noopener noreferrer nofollow" href="http://github.com/derianandre">Github</a>
							</li>
							<li>
								<Icon name="linkedin" class="me-3"/>
								<a target="_blank" rel="noopener noreferrer nofollow" href="http://linkedin.com/in/derianandre">Linkedin</a>
							</li>
						</ul>
					</CurriculumAboutSection>
					<!-- Specialty -->
					<CurriculumAboutSection name="specialty">
						<h4>
							{{ $t('curriculum.about.specialty.subtitle') }}
						</h4>
						<NuxtLink class="btn btn-outline-link h6 small text-uppercase px-4 m-0" :to="localePath('/projects/')">
							{{ $t('projects.title') }}
						</NuxtLink>
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
						<CurriculumAboutSkill class="mb-4" v-for="item in skills" :key="item" :name="item"/>
					</CurriculumAboutSection>
				</div>
				<!-- Experiece -->
				<div id="experience" class="col experience">
					<h2>
						{{ $t(`curriculum.experience.title`) }}
					</h2>
					<p class="intro">
						{{ $t(`curriculum.experience.lead`) }}
					</p>
					<hr>
					<template v-for="section in experience">
						<CurriculumExperienceSection :name="section.slug" :key="section.slug">
							<CurriculumExperienceItem v-for="item in section.items" :key="item" :name="item" :type="section.slug" />
						</CurriculumExperienceSection>
					</template>
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
		</PageContent>
	</PageMain>
</template>

<script>
	export default {
    data() {
			return {
				page: "curriculum",
				languages: [
					"spanish",
					"english",
				],
				skills: [
					"design",
					"frontend",
					"backend",
					"photography",
					"team",
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
								slug: "css",
								date: "2022-05-25T15:00:00.000Z",
								id: "6ee76af9c694",
								url: "https://www.hackerrank.com/certificates/6ee76af9c694"
							}, {
								slug: "javascript-basic",
								date: "2022-05-25T15:00:00.000Z",
								id: "65c6789e94d0",
								url: "https://www.hackerrank.com/certificates/65c6789e94d0"
							}, {
								slug: "javascript-intermediate",
								date: "2022-05-25T18:00:00.000Z",
								id: "fb3ac1cfe596",
								url: "https://www.hackerrank.com/certificates/fb3ac1cfe596"
							}, {
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
								slug: "complete-intro-to-react-v7",
								date: "2022-05-27T15:00:00.000Z",
								id: null,
								url: "https://frontendmasters.com/courses/complete-react-v7/"
							},
						]
					}
				]
			};
    },
	}
</script>