export default {
	// Config
	publicRuntimeConfig: {
		baseUrl: process.env.BASE_URL || 'http://localhost:3000',
	},

	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',
	
	// Server
	server: {
		host: '0.0.0.0'
	},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Derian André',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Freelancer: Diseño, Desarrollo y Fotografía' }
		],
		link: [
			{ rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
			{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lora:wght@300;400;500;600;700;800;900&display=swap' },
		],
		script: [
			{ src: 'https://polyfill.io/v3/polyfill.min.js?features=es6', body: true },
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'@/assets/scss/style.scss',
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: '~/plugins/bootstrap.client.js' },
		{ src: '~/plugins/lazysizes.client.js' }
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://color-mode.nuxtjs.org/
		'@nuxtjs/color-mode',
		// https://github.com/nuxt-community/svg-module
		'@nuxtjs/svg',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		// https://go.nuxtjs.dev/content
		'@nuxt/content',
		// https://go.nuxtjs.dev/i18n
		'nuxt-i18n'
	],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		extend (config, { isDev, isClient, loaders: { vue } }) {
		if (isClient) {
			vue.transformAssetUrls.img = ['data-src', 'src']
			vue.transformAssetUrls.source = ['data-srcset', 'srcset']
		}
		},
		loaders: {
		vue: {
			compilerOptions: {
				whitespace:         'condense',
				preserveWhitespace: false
			}
		},
		sass: {
			implementation: require('sass')
		},
		scss: {
			implementation: require('sass')
		}
		}
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		icon: {
			source: '@/static/',
			fileName: 'icon.png'
		},
		manifest: {
			name: 'Derian André',
			short_name: 'Derian André',
			description: 'Freelancer: Diseño, Desarrollo y Fotografía',
			lang: 'es',
			theme_color: '#333333'
		},
		meta: {
			theme_color: '#333333'
		},
	},

	// Content module configuration: https://go.nuxtjs.dev/config-content
	content: {},

	// Color mode configuration: https://color-mode.nuxtjs.org/
	colorMode: {
		preference:    'system',
		fallback:      'light',
		classPrefix:   '',
		classSuffix:   '',
	},

	// Internationalization (nuxt-i18n)
	i18n: {
		strategy: 'prefix',
		seo: true,
		locales: [
			{
				code: 'en',
				iso:  'en-US',
				file: 'en.json',
				name: 'English'
			},
			{
				code: 'es',
				iso:  'es-MX',
				file: 'es.json',
				name: 'Español'
			}
		],
		defaultLocale: 'es',
		lazy:          true,
		langDir:       '@/languages/',
		detectBrowserLanguage: {
			useCookie: true,
			onlyOnRoot: true,
			fallbackLocale: 'es'
		},
		vuex: {
			moduleName:      'i18n',
			syncLocale:      true,
			syncMessages:    true,
			syncRouteParams: true
		},
		vueI18n: {
			fallbackLocale: {
				'default': ['en', 'es'],
				'es-US':   ['es', 'en'],
				'es-MX':   ['es', 'en']
			}
		}
	},
}
