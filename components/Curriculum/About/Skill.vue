<template>
  <div :id="`skill-${slug}`">
    <h4>
      {{ $t(`curriculum.about.skills.${slug}.title`) }}
      <span>{{ $t(`curriculum.about.skills.${slug}.level`) }}</span>
    </h4>
    <div class="hstack hstack-skills gap-3 flex-wrap">
      <template v-for="item in data.items">
        <Figure :src="`curriculum/icons/${item}.svg`" :title="item"/>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      },
    },
    computed: {
      slug() {
        return this.data.slug;
      },
    }
  }
</script>

<style lang="scss">
  .hstack-skills {
    color: var(--body-color-high, #2D2E2F) !important;
    figure {
      margin: 0 !important;
      svg {
        width: 28px !important;
        height: 28px !important;
        object-fit: contain !important;
        object-position: center !important;
      }
    }
  }
</style>