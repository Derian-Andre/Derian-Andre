<template>
	<section id="content" class="content curriculum">
		<div class="row">
			<!-- About -->
			<div class="about">
				<h4>{{ $t('curriculum.about.title') }}</h4>
				<h5 class="intro">{{ $t('curriculum.about.intro') }}</h5>
				<hr>
				<!-- Contacto -->
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
				<hr>
				<!-- Área -->
				<h4>{{ $t('curriculum.about.area.title') }}</h4>
				<h5>{{ $t('curriculum.about.area.subtitle') }}</h5>
				<hr>
				<!-- Idiomas -->
				<h4>{{ $t('curriculum.about.languages.title') }}</h4>
				<h5>{{ $t('curriculum.about.languages.spanish.title') }} <span>{{ $t('curriculum.about.languages.spanish.level') }}</span></h5>
				<h5>{{ $t('curriculum.about.languages.english.title') }} <span>{{ $t('curriculum.about.languages.english.level') }}</span></h5>
				<hr>
				<!-- Habilidades -->
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
				<hr>
			</div>
			<!-- Experiencia -->
			<div class="experience">
				<h2>Experiencia</h2>
				<!-- Xolvex -->
				<svg-inline src="img/cv/xolvex.svg"/>
				<h3>Xolvex</h3>
				<h4>Lead Front-end Developer</h4>
				<span class="date">2019 Enero − Actual</span>
				<p>Encargado de la imágen de cualquier proyecto, en cualquier aspecto: diseño gráfico, diseño de interfaces, experiencia de usuario y desarrollo web (principalmente front-end).</p>
				<!-- Inbright -->
				<svg-inline src="img/cv/inbright.svg"/>
				<h3>Inbright</h3>
				<h4>Lead Front-end Developer</h4>
				<span class="date">2018 Noviembre − Actual</span>
				<p>Miembro principal del equipo responsable del desarrollo general, diseño gráfico en general, diseño de interfaces de usuario, experiencia de usuario y desarrollo full-stack (principalmente front-end) para los diversos proyectos in-house y externos, tales como:</p>
				<p><a href="https://inbright.mx">Inbright</a>, <a href="https://uxlon.com">Uxlon</a>, <a href="https://makeov.com">Makeov</a>, <a href="https://tudepot.com">TuDepot</a>, <a href="https://paxut.com">Paxut</a>, <a href="https://thehiveoffices.com">The Hive Offices</a>, <a href="https://xolvex.com">Xolvex</a>.</p>
				<!-- Uxlon -->
				<svg-inline src="img/cv/uxlon.svg"/>
				<h3>Uxlon</h3>
				<h4>Lead Front-end Developer</h4>
				<span class="date">2018 Noviembre − 2019 Enero</span>
				<p>Uxlon es perteneciente a  Inbright. Miembro principal del equipo responsable del diseño y experiencia de usuario para la plataforma de Uxlon, ICO frontpage y la web de la Empresa como prestadora de servicios con tecnología Blockchain.</p>
				<hr>
				<!-- Independiente -->
				<h2>Experiencia como Independiente</h2>
				<!-- Yo, obvio -->
				<svg-inline src="img/cv/derianandre.svg"/>
				<h3>Independiente</h3>
				<h4>Diseño, desarrollo &amp; fotografía</h4>
				<span class="date">2015 Agosto − Actual</span>
				<p>A través de los años me encargado de varios proyectos, desde re-diseños de imágenes corporativas, hasta solucionrd full-stack para PyMEs; proporcionando una solución completa y profesional para sus necesidades de adopción digital, mejorando la estructura de su empresa a través de proyectos como manejo de inventario en línea, entre muchos otros trabajos.</p>
				<hr>
				<!-- Proyectos personales -->
				<h2>Proyectos personales</h2>
				<!-- ORCA -->
				<svg-inline src="img/cv/derianandre.svg"/>
				<h3>Propio</h3>
				<h4>ORCA Tools</h4>
				<p>Herramienta para el analisis de archivos .out del paquete de programas de química cuántica ab initio.</p>
				<a target="_blank" rel="noreferrer noopener" href="http://derianandre.com/orca/">Utiliza las herraminetas para ORCA</a>
				<!-- Minimal W -->
				<svg-inline src="img/cv/derianandre.svg"/>
				<h3>Propio</h3>
				<h4>Minimal W</h4>
				<p>Skin del programa para reproductor multimedia VLC con un estilo inspirado en el diseño de Windows 10 (en sus primeras versiones) dándole un estilo nativo del sistema operativo.</p>
				<a target="_blank" rel="noreferrer noopener" href="http://derianandre.com/minimal-w/">Descarga el skin para VLC Minimal W</a>
				<!-- Phoenix.vg -->
				<figure><img src="~/static/assets/img/cv/phoenix.png" alt="Phoenix"></figure>
				<h3>Comunidad</h3>
				<h4>Phoenix</h4>
				<p>Phoenix es programa open-source, emulador de múltiples sistemas (videojuegos) diseñado para ser potente y fácil de usar. Desarrollado con Qt 5 y Libretro. Contribuí con todo el diseño, tanto la identidad, web e interfaz de usuario.</p>
				<a target="_blank" rel="noreferrer noopener" href="http://phoenix.vg/">Chéca la página de Phoenix.vg</a>
				<!-- PicoTorrent -->
				<svg-inline src="img/cv/picotorrent.svg"/>
				<h3>Comunidad</h3>
				<h4>PicoTorrent</h4>
				<p>Cliente de BiTorrent hackeable, ligero y open-source con un estilo nativo diseñado para Windows. Contribuyo en la parte visual del desarollo: identidad, web y diseño de interfaz.</p>
				<a target="_blank" rel="noreferrer noopener" href="https://picotrrent.org">Visita la página oficial de PicoTorrent</a>
				<hr>
				<!-- Prácticas profesionales -->
				<h2>Prácticas profesionales</h2>
				<!-- UDG-CINVESTAV -->
				<figure><img src="~/static/assets/img/cv/cinvestav.png" alt="CINVESTAV"></figure>
				<h3>UDG-CINVESTAV</h3>
				<h4>Simulaciones de sistemas moleculares organometálicos y desarrollo deaplicación web para análisis y manejo de datos</h4>
				<span class="date">2018 Agosto − Diciembre</span>
				<p>Simulaciones de diferentes sistemas moleculares organometálicos de C<sub>n</sub>H<sub>n</sub> (n = 4 – 6) con Sc, Ti y V para absorción de hidrógeno molecular y el efecto de ligantes (H, OH, NH<sub>2</sub>, CH<sub>3</sub> y F) con el software ORCA ab initio. Desarollo de aplicación web para el análisis de los archivos “.out” obtenido de las simulaciones: comparación de geometrías iniciales y ﬁnales en diferentes sistemas, gráﬁca de energías orbitales, comparación de datos entre diferentes simulaciones, detección de optimización, visualización del modelo 3D, generador de tablas comparativasentre simulaciones del mismo tipo, entre otras funciones</p>
				<!-- Casas y Terrenos -->
				<svg-inline src="img/cv/casasyterrenos.svg"/>
				<h3>Casas y Terrenos</h3>
				<h4>Programa de modelación matemática para el desarrollo de planes y proyectos de negocio utilizando machine learning</h4>
				<span class="date">2018 Enero − Mayo</span>
				<p>Sistema de caliﬁcación de propiedades según la calidad de su información, manejo de bases de datos MySQL y MongoDB, manejo de servidor por tunelaje SSH, programación en Python.</p>
				<hr>
				<!-- Educación -->
				<h2>Educación</h2>
				<!-- ITESO -->
				<svg-inline src="img/cv/iteso.svg"/>
				<h3>Instituto Tecnológico y de Estudios Superiores de Occidente</h3>
				<h4>Ingeniería en nanotecnología</h4>
				<span class="date">2013 − 2018</span>
				<p>Manejo del laboratorio de nanotecnología: equipos SEM, XPS, AFM y Sputtering. Simulación de sistemas moleculares y partículas con Python y ORCA. Síntesis y caracterización de nanomateriales: nanotubos de carbono, nanopartículas de plata y cobre, etc. Programación:&nbsp;Python, PHP, C, CSS, HTML, Bases de datos (MySQL)</p>
				<!-- CBTIS -->
				<svg-inline src="img/cv/dgeti.svg"/>
				<h3>Centro de Bachillerato Tecnológico Industrial y de Servicios #43</h3>
				<h4>Técnico mecatrónico</h4>
				<span class="date">2010 − 2013</span>
				<p>Manejo de equipos: fresadora, torno. Programación de PLC. Diseño CAD (AutoCAD) y 3D (SolidWorks) para diseño de mecanismos y piezas. Diseño e impresión de circuitos en PCB.</p>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		head() {
			return {
				title: `${this.$i18n.t('curriculum.title')} – Derian André`,
				bodyAttrs: {
					class: 'curriculum'
				}
			}
		},
		fetch() {
			this.$store.commit('page/setTitle',    this.$i18n.t('curriculum.title'));
			this.$store.commit('page/setSubtitle', this.$i18n.t('curriculum.subtitle'));
		},
	}
</script>