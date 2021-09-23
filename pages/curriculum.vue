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
				<div class="col about">
					<!-- Introducción -->
					<section id="intro">
						<h4>{{ $t('curriculum.about.intro.title') }}</h4>
						<h5 class="intro mb-4">{{ $t('curriculum.about.intro.subtitle') }}</h5>
						<NuxtLink class="btn btn-outline-link h6 small text-uppercase px-4 m-0" :to="localePath('/projects/')">
							{{ $t('projects.title') }}
						</NuxtLink>
					</section>
					<hr>
					<!-- Contacto -->
					<section id="contact">
						<h4>{{ $t('curriculum.about.contact.title') }}</h4>
						<ul class="list-unstyled">
							<li>
								<i class="me-3 bi bi-geo-alt-fill"></i>
								{{ $t('curriculum.about.contact.address') }}
							</li>
							<li>
								<i class="me-3 bi bi-phone-fill"></i>
								<a target="_blank" rel="noopener noreferrer" href="tel:+523312781411">33 1278 1411</a>
							</li>
							<li>
								<i class="me-3 bi bi-envelope-fill"></i>
								<a target="_blank" rel="noopener noreferrer" href="mailto:hola@derianandre.com">hola@derianandre.com</a>
							</li>
							<li>
								<i class="me-3 bi bi-github"></i>
								<a target="_blank" rel="noopener noreferrer" href="http://github.com/derianandre">Github</a>
							</li>
							<li>
								<i class="me-3 bi bi-linkedin"></i>
								<a target="_blank" rel="noopener noreferrer" href="http://linkedin.com/in/derianandre">Linkedin</a>
							</li>
						</ul>
					</section>
					<hr>
					<!-- Especialidad -->
					<section id="specialty">
						<h4>{{ $t('curriculum.about.specialty.title') }}</h4>
						<h5>{{ $t('curriculum.about.specialty.subtitle') }}</h5>
					</section>
					<hr>
					<!-- Idiomas -->
					<section id="languages">
						<h4>{{ $t('curriculum.about.languages.title') }}</h4>
						<h5>{{ $t('curriculum.about.languages.english.title') }} <span>{{ $t('curriculum.about.languages.english.level') }}</span></h5>
						<h5>{{ $t('curriculum.about.languages.spanish.title') }} <span>{{ $t('curriculum.about.languages.spanish.level') }}</span></h5>
					</section>
					<hr>
					<!-- Habilidades -->
					<section id="abilities">
						<h4>{{ $t('curriculum.about.abilities.title') }}</h4>
						<h5>{{ $t('curriculum.about.abilities.design.title') }} <span>{{ $t('curriculum.about.abilities.design.level') }}</span></h5>
						<p>{{ $t('curriculum.about.abilities.design.abilities') }}</p>
						<h5>{{ $t('curriculum.about.abilities.frontend.title') }} <span>{{ $t('curriculum.about.abilities.frontend.level') }}</span></h5>
						<p>{{ $t('curriculum.about.abilities.frontend.abilities') }}</p>
						<h5>{{ $t('curriculum.about.abilities.backend.title') }} <span>{{ $t('curriculum.about.abilities.backend.level') }}</span></h5>
						<p>{{ $t('curriculum.about.abilities.backend.abilities') }}</p>
						<h5>{{ $t('curriculum.about.abilities.photography.title') }} <span>{{ $t('curriculum.about.abilities.photography.level') }}</span></h5>
						<p>{{ $t('curriculum.about.abilities.photography.abilities') }}</p>
						<h5>{{ $t('curriculum.about.abilities.team.title') }} <span>{{ $t('curriculum.about.abilities.team.level') }}</span></h5>
						<p>{{ $t('curriculum.about.abilities.team.abilities') }}</p>
					</section>
					<hr>
				</div>
				<!-- Experiencia -->
				<div class="col experience">
					<!-- Trabajos -->
					<section id="jobs">
						<h2>{{ $t('curriculum.experience.title') }}</h2>
						<template v-for="(item, index) in jobs" >
							<hr :key="index" v-if="index === jobs.length - 1" />
							<section :id="item" :key="item">
								<h2 v-if="index === jobs.length - 1">{{ $t(`curriculum.experience.jobs.${item}.heading`) }}</h2>
								<Figure :src="`curriculum/${item}.svg`" />
								<h3>{{ $t(`curriculum.experience.jobs.${item}.title`) }}</h3>
								<h4>{{ $t(`curriculum.experience.jobs.${item}.position`) }}</h4>
								<h5 class="date">{{ $t(`curriculum.experience.jobs.${item}.date`) }}</h5>
								<p v-html="$t(`curriculum.experience.jobs.${item}.description`)"/>
							</section>
						</template>
					</section>
					<hr>
					<!-- Educación -->
					<section id="education">
						<h2>{{ $t(`curriculum.experience.education.title`) }}</h2>
						<template v-for="item in education" >
							<section :id="item" :key="item">
								<Figure :src="`curriculum/${item}.svg`" />
								<h3>{{ $t(`curriculum.experience.education.${item}.title`) }}</h3>
								<h4>{{ $t(`curriculum.experience.education.${item}.subtitle`) }}</h4>
								<h5 class="date">{{ $t(`curriculum.experience.education.${item}.date`) }}</h5>
								<p v-html="$t(`curriculum.experience.education.${item}.description`)"/>
							</section>
						</template>
					</section>
					<hr>
					<!-- Prácticas profesionales -->
					<section id="practices">
						<h2>{{ $t(`curriculum.experience.practices.title`) }}</h2>
						<template v-for="item in practices" >
							<section :id="item" :key="item">
								<Figure :src="`curriculum/${item}.svg`" />
								<h3>{{ $t(`curriculum.experience.practices.${item}.title`) }}</h3>
								<h4>{{ $t(`curriculum.experience.practices.${item}.subtitle`) }}</h4>
								<h5 class="date">{{ $t(`curriculum.experience.practices.${item}.date`) }}</h5>
								<p v-html="$t(`curriculum.experience.practices.${item}.description`)" />
							</section>
						</template>
					</section>
				</div>
			</div>
		</PageContent>
	</PageMain>
</template>

<script>
	export default {
		data() {
			return {
				page: 'curriculum',
				jobs: [
					'xolvex',
					'inbright',
					'uxlon',
					'derianandre'
				],
				education: [
					'iteso',
					'cbtis'
				],
				practices: [
					'cinvestav',
					'casasyterrenos'
				]
			}
		},
	}
</script>