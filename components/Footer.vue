<template>
	<footer class="social vstack gap-1" aria-label="Footer">
		<a target="_blank" rel="noopener noreferrer" v-for="item in social" :key="item.slug" :href="item.link" :title="$t(`social.${item.slug}`)">
			<i class="bi" :class="`bi-${item.icon}`"></i>
		</a>
		<a target="_blank" rel="noopener noreferrer" :href="`https://wa.me/523312781411?text=${$t('social.whatsapp_api')}`" :title="$t('social.whatsapp')">
			<i class="bi bi-whatsapp"></i>
		</a>
	</footer>
</template>

<script>
	export default {
		data() {
			return {
				social: [
					{ slug: 'instagram',	icon: 'instagram',		link: 'http://instagram.com/DerianAndre' },
					{ slug: 'linkedin',	icon: 'linkedin',			link: 'http://linkedin.com/in/DerianAndre' },
					{ slug: 'github',		icon: 'github',			link: 'http://github.com/DerianAndre' },
					{ slug: 'mail',		icon: 'envelope-fill',	link: 'mailto:hola@derianandre.com' },
				]
			}
		},
	}
</script>