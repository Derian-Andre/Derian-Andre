// Generate Routes for Blog
import fs from 'fs';
const path = require('path');
function generateRoutes(lang, type, subfolder = false) {
	const content = subfolder ? `${type}/${lang}` : type;
	const fileType = '.md';
	return fs.readdirSync(path.resolve(__dirname, 'content', content))
		.filter(filename => path.extname(filename) === fileType)
		.map(filename => `/${lang}/${type}/${path.parse(filename).name}`)
}

export default {
	// Config
	publicRuntimeConfig: {
		baseUrl: process.env.NODE_ENV === 'production' ? 'https://derianandre.com' : 'http://localhost:3000',
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
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		],
		link: [
			{ rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
		],
		script: [
			{ src: 'https://polyfill.io/v3/polyfill.min.js?features=es6', body: true },
		]
	},
	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'~/assets/scss/style.scss',
	],
	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: '~/plugins/bootstrap.client.js' },
		{ src: '~/plugins/lazysizes.client.js' }
	],
	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,
	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/content
		'@nuxt/content',
		// https://go.nuxtjs.dev/i18n
		'@nuxtjs/i18n',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		// https://html-validator.nuxtjs.org/
		'@nuxtjs/html-validator',
		// https://google-fonts.nuxtjs.org/
		'@nuxtjs/google-fonts',
		// https://github.com/moritzsternemann/vue-plausible - https://plausible.io
		//'vue-plausible'
	],
	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://color-mode.nuxtjs.org/
		'@nuxtjs/color-mode',
		// https://github.com/nuxt-community/svg-module
		'@nuxtjs/svg',
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
	// Nuxt.js Generate configuration
	generate: {
		fallback: true,
		routes: ['/es', '/en', '404']
			.concat(generateRoutes('es', 'blog'))
			.concat(generateRoutes('en', 'blog'))
			.concat(generateRoutes('es', 'work'))
			.concat(generateRoutes('en', 'work'))
			.concat(generateRoutes('es', 'projects', true))
			.concat(generateRoutes('en', 'projects', true))
	},
	// Custom modules configuration
	// @nuxt/content https://go.nuxtjs.dev/config-content
	content: {

	},
	// @nuxtjs/color-mode https://color-mode.nuxtjs.org/
	colorMode: {
		preference:    'system',
		fallback:      'light',
		classPrefix:   '',
		classSuffix:   '',
	},
	// nuxt-i18n https://i18n.nuxtjs.org/options-reference/
	i18n: {
		strategy: 'prefix',
		defaultLocale: 'es',
		lazy:          true,
		langDir:       '~/languages/',
		locales: [
			{
				code: 'en',
				iso:  'en-US',
				file: 'en.js',
				name: 'English'
			},
			{
				code: 'es',
				iso:  'es-MX',
				file: 'es.js',
				name: 'Español'
			}
		],
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
	// @nuxtjs/pwa https://go.nuxtjs.dev/pwa
	pwa: {
		icon: {
			source: '~/static/',
			fileName: 'derianandre.png'
		},
		manifest: {
			name: 'Derian André',
			short_name: 'Derian André',
			description: 'Freelancer Full-stack Designer',
			lang: 'es',
			theme_color: '#1D1F26',
			background_color: '#1D1F26',
		},
		meta: {
			theme_color: '#1D1F26'
		},
	},
	// Google fonts
	googleFonts: {
		families: {
			Montserrat:  {
				wght: [300, 400, 500, 600, 700, 800, 900]
			},
			Lora: {
				ital: [400, 500, 600, 700],
				wght: [400, 500, 600, 700]
			}
		}
	},
	// HTML Validator
	htmlValidator: {
    usePrettier: false,
    failOnError: false,
    options: {
      extends: [
        'html-validate:document',
        'html-validate:recommended',
        'html-validate:standard'
      ],
      rules: {
        'svg-focusable': 'off',
        'no-unknown-elements': 'error',
        // Conflict with Nuxt defaults
        'require-sri': 'off',
				'attribute-empty-style': 'off',
        'attribute-boolean-style': 'off',
        'doctype-style': 'off',
				'element-permitted-content': 'off',
        // Unreasonable rule
        'no-inline-style': 'off'
      }
    }
  },
	// Plausible.io
	//plausible: {
	//	domain: 'derianandre.com'
	//},
}
