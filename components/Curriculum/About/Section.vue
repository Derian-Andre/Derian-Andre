<template>
  <section :id="name">
    <h3>
      {{ $t(`curriculum.about.${name}.title`) }}
    </h3>
    <slot></slot>
    <hr>
  </section>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
    }
  }
</script>