<template>
	<header ref="header" id="header" class="header">
		<div class="top">
			<NuxtLink class="logo" :to="localePath('/')">
				<h1>Derian André Castillo Franco</h1>
				<Logo />
			</NuxtLink>
		</div>
		<div class="center">
			<nav role="navigation" aria-label="Menu">
				<NuxtLink class="item" v-for="item in menu" :key="item.slug" :to="localePath(item.to)">
					{{ $t(`header.${item.slug}`) }}
				</NuxtLink>
				<button class="item" type="button" @click="changeLanguage" :title="locales[$i18n.locale].name">
					{{ $i18n.locale }}
				</button>
			</nav>
		</div>
		<div class="bottom">
			<button class="toggler" type="button" @click="changeTheme" :title="$t(`header.${$colorMode.value}`)">
				<span class="visually-hidden">
					{{ $t(`header.${$colorMode.value}`) }}
				</span>
			</button>
		</div>
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
					{ slug: 'home', to: '/home/' },
					{ slug: 'blog', to: '/blog/' },
					{ slug: 'about', to: '/about/' },
					{ slug: 'curriculum', to: '/curriculum/' },
					{ slug: 'services', to: '/services/' },
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
				const	root			=	document.documentElement,
							header		= document.getElementById('header')			|| null,
							pageInfo	=	document.getElementById('page-info')	|| null;
				// Variables
				var	headerWidth		= header		? header.offsetWidth		: 92,
						pageInfoWidth	= pageInfo	? pageInfo.offsetWidth	: 130;
				// Root variables
				if(header)		root.style.setProperty('--header-width',		`${headerWidth}px`);
				if(pageInfo)	root.style.setProperty('--page-info-width',	`${pageInfoWidth}px`);
			},
			changeLanguage() {
				let locale = this.$i18n.locale === 'es' ? 'en' : 'es';
				this.$router.replace(this.switchLocalePath(locale));
			},
			changeTheme() {
				this.$colorMode.preference = this.$colorMode.value === 'dark' ? 'light' : 'dark';
			}
		},
	}
</script>