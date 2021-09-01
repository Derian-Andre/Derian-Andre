<template>
	<footer class="footer social">
		<nav>
			<a target="_blank" rel="noopener noreferrer" v-for="item in social" :key="item.slug" :href="item.link" :title="$t(`social.${item.slug}`)">
				<i class="bi" :class="`bi-${item.slug}`"></i>
			</a>
			<a target="_blank" rel="noopener noreferrer" :href="`https://wa.me/523312781411?text=${$t('social.whatsapp_api')}`" :title="$t('social.whatsapp')">
				<i class="bi bi-whatsapp"></i>
			</a>
		</nav>
	</footer>
</template>

<script>
export default {
	data() {
		return {
			social: [
				{ slug: 'instagram', link: 'http://instagram.com/DerianAndre' },
				{ slug: 'linkedin', link: 'http://linkedin.com/in/DerianAndre' },
				{ slug: 'github', link: 'http://github.com/DerianAndre' },
			]
		}
	},
}
</script>