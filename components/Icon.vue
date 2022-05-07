<template>
  <i class="icon" :class="icon"/>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      }
    },
    computed: {
      icon() {
        return `bi bi-${this.name}`
      }
    }
  }
</script>