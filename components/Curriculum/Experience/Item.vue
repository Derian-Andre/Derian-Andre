<template>
  <section :id="`${type}-${name}`">
    <Figure class="figure-logo" :src="`curriculum/${name}.svg`" />
    <h4 class="title">
      {{ $t(`curriculum.experience.${type}.${name}.title`) }}
    </h4>
    <h5 class="subtitle">
      {{ $t(`curriculum.experience.${type}.${name}.subtitle`) }}
    </h5>
    <h6 class="date">
      {{ $t(`curriculum.experience.${type}.${name}.date`) }}
    </h6>
    <p class="description mb-2"
      v-html="$t(`curriculum.experience.${type}.${name}.description`)">
    </p>
    <div class="hstack-skills hstack-skills-experience hstack gap-2 flex-wrap mb-5" v-if="stack">
      <template v-for="item in stack">
        <Figure :src="`curriculum/icons/${item}.svg`" :title="item"/>
      </template>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      },
      type: {
        type: String,
        required: true
      },
    },
    computed: {
      name() {
        return this.data.slug;
      },
      stack() {
        const stack = this.data.stack && this.data.stack.length > 0 ? this.data.stack : false;
        return stack;
      },
    },
  }
</script>