<template>
	<figure>
		<div class="svg" :style="style" v-if="isSvg && isInline"
			v-html="require(`~/assets/img/${src}?raw`)">
		</div>
		<div class="img" :style="style" :class="isSvg ? 'svg' : false" v-else>
			<LazyImg :src="src" :alt="alt"/>
		</div>
		<figcaption v-if="hasCaption">
			<slot />
		</figcaption>
	</figure>
</template>

<script>
	export default {
		props: {
			src: String,
			alt: String,
			maxWidth: String,
			maxHeight: String,
			inline: {
				type: String | Boolean,
				default: true
			},
		},
		computed: {
			style() {
				let style = '';
				if(this.maxWidth)  style += `max-width: ${this.maxWidth};`;
				if(this.maxHeight) style += `max-height: ${this.maxHeight};`;
				return style != '' ? style : null;
			},
			isSvg() {
				return this.src.endsWith('.svg');
			},
			isInline() {
				return this.inline === true || this.inline === 'true';
			},
			hasCaption() {
				return (this.$slots.default && this.$slots.default[0].text != "\n") ? true : false;
			}
		}
	}
</script>