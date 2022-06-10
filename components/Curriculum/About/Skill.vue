<template>
  <div :id="`skill-${slug}`">
    <h4>
      {{ $t(`curriculum.about.skills.${slug}`) }}
      <span>{{ $t(`curriculum.about.skills.years`, { years: data.years }) }}</span>
    </h4>
    <div class="hstack hstack-skills gap-3 flex-wrap">
      <template v-for="item in data.items">
        <Figure :src="`curriculum/icons/${item}.svg`" :title="item" v-if="item"/>
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