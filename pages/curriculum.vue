<template>
   
</template>

<script>
   export default {
      layout: 'page',
      created() {
         this.$store.commit('page/setName', 'Curriculum Vitae')
      },
   }
</script>