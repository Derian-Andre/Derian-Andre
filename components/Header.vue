<template>
	<header id="header" class="header">
		<NuxtLink class="logo" to="/">
			<h1>Derian André Castillo Franco</h1>
			<Logo />
		</NuxtLink>
		<div class="wrapper">
			<nav>
				<NuxtLink to="/">Inicio</NuxtLink>
				<NuxtLink to="/blog/">Blog</NuxtLink>
				<NuxtLink to="/servicios/">Work</NuxtLink>
				<NuxtLink to="/curriculum/">Ego</NuxtLink>
				<a role="button" id="toggler" class="toggler" title="Cambiar el tema"></a>
			</nav>
		</div>
		<a class="footer" href="mailto:hola@derianandre.com" title="Mándame un correo">
			<i class="bi bi-envelope"></i>
			<span class="visually-hidden">Mándame un correo</span>
		</a>
	</header>
</template>

<script>
	export default {
		data() {
			return {
				themes: {
					'dark':   'Dark',
					'light':  'Light',
					'system': 'Sistema'
				},
			}
		},
		mounted() {
			const root    = document.documentElement,
						header  = document.querySelector('#header') || null,
						info    = document.querySelector('#info') || null;
			function rootVariables() {
				var headerWidth = header ? header.offsetWidth : 0,
						infoWidth   = info   ? info.offsetWidth   : 0;
				root.style.setProperty('--header-width', `${headerWidth}px`);
				root.style.setProperty('--info-width',   `${infoWidth}px`);
			}
			rootVariables();
			window.addEventListener('resize', rootVariables, false);
		},
	}
</script>