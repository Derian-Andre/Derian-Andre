<template>
	<main role="main" id="main" class="page error">
		<section id="info" class="info">
			<h1 id="title" class="title"><span>Error 404</span></h1>
			<span id="subtitle" class="subtitle">No se encontró la estúpida y sensual página</span>
		</section>
		<!-- Content -->
		<section id="content" class="content">
			<p class="lead">
				Quizás la borré o quién sabe... todo se me olvida o quizás no...
			</p>
			<p>
				En fin, si esta página no se encontró, <b>¿por qué existe esta página?</b>
			</p>
			<p>
				<b>¿Como puedo ser una página no encontrada?</b>, si me acabas de encontrar...
			</p>
			<p>
				Entonces.. <b>¿soy o no soy?</b>
				</p>
			<p>
				<b>¿Qué es ser?</b>
			</p>
			<p>
				<b>¿Quién eres tú?</b> y... <b>¿qué haces aquí?</b>
			</p>
			<p>
				<b>¿Eres real?</b>
			</p>
			<p class="display-2">
				42
			</p>
			<NuxtLink class="btn btn-outline-link mt-4" to="/">¡Regresa al inicio de la creación!</NuxtLink>
		</section>
		<!-- Right -->
		<section id="right" class="right">
			<span class="emoji">
				<img draggable="false" role="img" alt="🤔" src="https://s.w.org/images/core/emoji/13.1.0/svg/1f914.svg" width="100%">
			</span>
		</section>
	</main>
</template>

<script>
	export default {
		head() {
			return {
				title: 'Error 404',
				bodyAttrs: {
					class: 'error'
				}
			}
		}
	}
</script>