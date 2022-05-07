<template>
  <div :id="`skill-${name}`">
    <h4>
      {{ $t(`curriculum.about.skills.${name}.title`) }}
      <span>{{ $t(`curriculum.about.skills.${name}.level`) }}</span>
    </h4>
    <p>
      {{ $t(`curriculum.about.skills.${name}.skills`) }}
    </p>
  </div>
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