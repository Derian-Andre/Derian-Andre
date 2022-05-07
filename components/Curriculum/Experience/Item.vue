<template>
  <section :id="`${type}-${name}`">
    <Figure :src="`curriculum/${name}.svg`" />
    <h4 class="title">
      {{ $t(`curriculum.experience.${type}.${name}.title`) }}
    </h4>
    <h5 class="subtitle">
      {{ $t(`curriculum.experience.${type}.${name}.subtitle`) }}
    </h5>
    <h6 class="date">
      {{ $t(`curriculum.experience.${type}.${name}.date`) }}
    </h6>
    <p class="description" 
      v-html="$t(`curriculum.experience.${type}.${name}.description`)">
    </p>
  </section>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
  }
</script>