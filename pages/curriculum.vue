<template>
	<section id="content" class="content curriculum">
		<div class="row">
			<!-- About -->
			<div class="about">
				<h4>Perfil</h4>
				<h5 class="intro">Ingeniero en nanotecnología con enfoque en desarrollo de aplicaciones, diseño, programación, simulación y modelado matemático, todo con un diseño UX/UI hermoso.</h5>
				<hr>
				<!-- Contacto -->
				<h4>Contacto</h4>
				<ul class="list-unstyled">
					<li>
						<i class="me-3 bi bi-geo-alt"></i>
						Zapopan, Jalisco, México
					</li>
					<li>
						<i class="me-3 bi bi-phone"></i>
						<a target="_blank" rel="noopener noreferrer" href="tel:+523312781411">33 1278 1411</a>
					</li>
					<li>
						<i class="me-3 bi bi-envelope"></i>
						<a target="_blank" rel="noopener noreferrer" href="mailto:hola@derianandre.com">hola@derianandre.com</a>
					</li>
					<li>
						<i class="me-3 bi bi-linkedin"></i>
						<a target="_blank" rel="noopener noreferrer" href="http://linkedin.com/in/derianandre">linkedin.com/in/derianandre</a>
					</li>
				</ul>
				<hr>
				<!-- Área -->
				<h4>Áreas de especialidad</h4>
				<h5>Diseño, desarrollo, ingeniería e investigación.</h5>
				<hr>
				<!-- Idiomas -->
				<h4>Idiomas</h4>
				<h5>Inglés  <span>Avanzado</span></h5>
				<h5>Español <span>Nativo</span></h5>
				<hr>
				<!-- Habilidades -->
				<h4>Mis habilidades</h4>
				<h5>Diseño <span>10 años</span></h5>
				<p>Illustrator Photoshop InDesign Figma</p>
				<h5>Front-end <span>3 años</span></h5>
				<p>HTML CSS SASS JavaScript NuxtJS VueJS jQuery</p>
				<h5>Back-end <span>2 años</span></h5>
				<p>NodeJS ExpressJS MongoDB Mongoose PHP MySQL Python</p>
				<h5>Fotografía <span>5 años</span></h5>
				<p>Retrato Paisaje Producto</p>
				<h5>Trabajo en equipo <span>3 años</span></h5>
				<p>Git Slack Trello</p>
			</div>
			<!-- Experiencia -->
			<div class="experience">
				<h2>Experiencia</h2>
				<!-- Xolvex -->
				<figure v-html="Xolvex" />
				<h3>Xolvex</h3>
				<h4>Lead Front-end Developer</h4>
				<span class="date">2019 Enero − Actual</span>
				<p>Encargado de la imágen de cualquier proyecto, en cualquier aspecto: diseño gráfico, diseño de interfaces, experiencia de usuario y desarrollo web (principalmente front-end).</p>
				<!-- Inbright -->
				<figure v-html="Inbright"/>
				<h3>Inbright</h3>
				<h4>Lead Front-end Developer</h4>
				<span class="date">2018 Noviembre − Actual</span>
				<p>Miembro principal del equipo responsable del desarrollo general, diseño gráfico en general, diseño de interfaces de usuario, experiencia de usuario y desarrollo full-stack (principalmente front-end) para los diversos proyectos in-house y externos, tales como:</p>
				<p><a href="https://inbright.mx">Inbright</a>, <a href="https://uxlon.com">Uxlon</a>, <a href="https://makeov.com">Makeov</a>, <a href="https://tudepot.com">TuDepot</a>, <a href="https://paxut.com">Paxut</a>, <a href="https://thehiveoffices.com">The Hive Offices</a>, <a href="https://xolvex.com">Xolvex</a>.</p>
				<!-- Uxlon -->
				<figure v-html="Uxlon"/>
				<h3>Uxlon</h3>
				<h4>Lead Front-end Developer</h4>
				<span class="date">2018 Noviembre − 2019 Enero</span>
				<p>Uxlon es perteneciente a  Inbright. Miembro principal del equipo responsable del diseño y experiencia de usuario para la plataforma de Uxlon, ICO frontpage y la web de la Empresa como prestadora de servicios con tecnología Blockchain.</p>
				<hr>
				<!-- Independiente -->
				<h2>Experiencia como Independiente</h2>
				<!-- Yo, obvio -->
				<figure v-html="DerianAndre" />
				<h3>Independiente</h3>
				<h4>Diseño, desarrollo &amp; fotografía</h4>
				<span class="date">2015 Agosto − Actual</span>
				<p>A través de los años me encargado de varios proyectos, desde re-diseños de imágenes corporativas, hasta solucionrd full-stack para PyMEs; proporcionando una solución completa y profesional para sus necesidades de adopción digital, mejorando la estructura de su empresa a través de proyectos como manejo de inventario en línea, entre muchos otros trabajos.</p>
				<hr>
				<!-- Proyectos personales -->
				<h2>Proyectos personales</h2>
				<!-- ORCA -->
				<figure v-html="DerianAndre" />
				<h4>ORCA Tools</h4>
				<p>Herramienta para el analisis de archivos .out del paquete de programas de química cuántica ab initio.</p>
				<a target="_blank" rel="noreferrer noopener" href="http://derianandre.com/orca/">Utiliza las herraminetas para ORCA</a>
				<!-- Minimal W -->
				<figure v-html="DerianAndre" />
				<h4>Minimal W</h4>
				<p>Skin del programa para reproductor multimedia VLC con un estilo inspirado en el diseño de Windows 10 (en sus primeras versiones) dándole un estilo nativo del sistema operativo.</p>
				<a target="_blank" rel="noreferrer noopener" href="http://derianandre.com/minimal-w/">Descarga el skin para VLC Minimal W</a>
				<!-- Phoenix.vg -->
				<figure><img src="~/static/assets/img/cv/phoenix.png" alt="Phoenix"></figure>
				<h4>Phoenix</h4>
				<p>Phoenix es programa open-source, emulador de múltiples sistemas (videojuegos) diseñado para ser potente y fácil de usar. Desarrollado con Qt 5 y Libretro. Contribuí con todo el diseño, tanto la identidad, web e interfaz de usuario.</p>
				<a target="_blank" rel="noreferrer noopener" href="http://phoenix.vg/">Chéca la página de Phoenix.vg</a>
				<!-- PicoTorrent -->
				<figure v-html="PicoTorrent" />
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
				<figure v-html="CasasyTerrenos" />
				<h3>Casas y Terrenos</h3>
				<h4>Programa de modelación matemática para el desarrollo de planes y proyectos de negocio utilizando machine learning</h4>
				<span class="date">2018 Enero − Mayo</span>
				<p>Sistema de caliﬁcación de propiedades según la calidad de su información, manejo de bases de datos MySQL y MongoDB, manejo de servidor por tunelaje SSH, programación en Python.</p>
				<hr>
				<!-- Educación -->
				<h2>Educación</h2>
				<!-- ITESO -->
				<figure v-html="ITESO" />
				<h3>Instituto Tecnológico y de Estudios Superiores de Occidente</h3>
				<h4>Ingeniería en nanotecnología</h4>
				<span class="date">2013 − 2018</span>
				<p>Manejo del laboratorio de nanotecnología: equipos SEM, XPS, AFM y Sputtering. Simulación de sistemas moleculares y partículas con Python y ORCA. Síntesis y caracterización de nanomateriales: nanotubos de carbono, nanopartículas de plata y cobre, etc. Programación:&nbsp;Python, PHP, C, CSS, HTML, Bases de datos (MySQL)</p>
				<!-- CBTIS -->
				<figure v-html="DGETI" />
				<h3>Centro de Bachillerato Tecnológico Industrial y de Servicios #43</h3>
				<h4>Técnico mecatrónico</h4>
				<span class="date">2010 − 2013</span>
				<p>Manejo de equipos: fresadora, torno. Programación de PLC. Diseño CAD (AutoCAD) y 3D (SolidWorks) para diseño de mecanismos y piezas. Diseño e impresión de circuitos en PCB.</p>
			</div>
		</div>
	</section>
</template>

<script>
	import DerianAndre from '~/static/assets/img/cv/derianandre.svg?raw';
	import Xolvex from '~/static/assets/img/cv/xolvex.svg?raw';
	import Inbright from '~/static/assets/img/cv/inbright.svg?raw';
	import Uxlon from '~/static/assets/img/cv/uxlon.svg?raw';
	import PicoTorrent from '~/static/assets/img/cv/picotorrent.svg?raw';
	import CasasyTerrenos from '~/static/assets/img/cv/cyt.svg?raw';
	import ITESO from '~/static/assets/img/cv/iteso.svg?raw';
	import DGETI from '~/static/assets/img/cv/dgeti.svg?raw';

	export default {
		data() {
			return {
				DerianAndre,
				Xolvex,
				Inbright,
				Uxlon,
				PicoTorrent,
				CasasyTerrenos,
				ITESO,
				DGETI,
			}
		},
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