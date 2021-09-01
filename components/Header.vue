<template>
	<header id="header" class="header">
		<NuxtLink class="logo" to="/">
			<h1>Derian André Castillo Franco</h1>
			<Logo />
		</NuxtLink>
		<div class="wrapper">
			<nav>
				<NuxtLink class="link" v-for="item in menu" :key="item.slug" :to="item.to">
					{{ $t(`header.${item.slug}`) }}
				</NuxtLink>
				<button class="link" type="button" @click="changeLanguage" :title="locales[$i18n.locale].name">
					{{ $i18n.locale }}
				</button>
				<button class="link" type="button" @click="changeTheme">
					{{ $t(`header.${$colorMode.value}`) }}
				</button>
			</nav>
		</div>
		<a class="footer" href="mailto:hola@derianandre.com" :title="$t('header.send_mail')">
			<i class="bi bi-envelope"></i>
			<span class="visually-hidden">{{ $t('header.send_mail') }}</span>
		</a>
	</header>
</template>

<script>
	export default {
		data() {
			return {
				locales: {
					es: {
						name: 'Español',
					},
					en: {
						name: 'English',
					}
				},
				menu: [
					{ slug: 'home', to: '/' },
					{ slug: 'blog', to: '/blog/' },
					{ slug: 'services', to: '/servicios/' },
					{ slug: 'curriculum', to: '/curriculum/' },
				]
			}
		},
		mounted() {
			setTimeout(this.rootVariables, 1);
			window.addEventListener('resize', this.rootVariables, false);
		},
		methods: {
			rootVariables() {
				// Constants
				const	root    = document.documentElement,
						header  = document.querySelector('#header') || null,
						info    = document.querySelector('#info') || null;
				// Variables
				var	headerWidth = header ? header.offsetWidth : 92,
						infoWidth 	= info   ? info.offsetWidth   : 130;
				// Root variables
				root.style.setProperty('--header-width', `${headerWidth}px`);
				root.style.setProperty('--info-width',   `${infoWidth}px`);
			},
			changeLanguage() {
				this.$i18n.locale = this.$i18n.locale === 'es' ? 'en' : 'es';
			},
			changeTheme() {
				this.$colorMode.preference = this.$colorMode.value === 'dark' ? 'light' : 'dark';
			}
		},
	}
</script>