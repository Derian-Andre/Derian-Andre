<template>
  <section :id="name" :class="name">
    <h3>
      {{ $t(`curriculum.experience.${name}.title`) }}
    </h3>
    <slot></slot>
    <hr />
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