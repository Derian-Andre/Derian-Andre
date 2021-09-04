<template>
	<figure>
		<div class="svg" v-if="svg"
			v-html="require(`~/static/assets/${src}?raw`)">
		</div>
		<div class="img" v-else>
			<LazyImg :src="img" :width="width" :height="height" :alt="alt"/>
		</div>
		<figcaption v-if="caption">
			<slot />
		</figcaption>
	</figure>
</template>

<script>
	export default {
		props: ['src', 'alt', 'width', 'height'],
		data() {
			return {
				svg: true,
				img: '',
				caption: false
			}
		},
		created() {
			// Check if it has a caption
			this.caption = (this.$slots.default && this.$slots.default[0].text != "\n") ? true : false;
			// Check if it's a svg
			let regexSvg = /\.(svg)$/i;
			this.svg = regexSvg.test(this.src) ? true : false;
			// If not then check if it's an external image
			if(!this.svg) {
				let regexUrl = /^(https?:\/\/|\/)/i;
				let isExternal = regexUrl.test(this.src) ? true : false;
				this.img = isExternal ? this.src : `/assets/${this.src}`;
			}
		}
	}
</script>