<template>
  <div class="layout">
    <Header />
    <main role="main" id="main" class="page">
      <section id="info" class="info">
        <h1 id="title" class="title"><span>{{ title }}</span></h1>
        <span id="subtitle" class="subtitle" v-if="subtitle">{{ subtitle }}</span>
      </section>
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
  export default {
    mounted() {
      const root = document.documentElement,
            header  = document.querySelector('header.header') || null,
            info = document.getElementById('info') || null;
      function rootVariables() {
        if(header) root.style.setProperty('--header-width', header.offsetWidth + 'px');
        if(info)   root.style.setProperty('--info-width', info.offsetWidth + 'px');
      }
      rootVariables();
      window.addEventListener('resize', rootVariables, false);
    },
    computed: {
      title() {
        return this.$store.getters['page/getTitle']
      },
      subtitle() {
        return this.$store.getters['page/getSubtitle']
      }
    }
  }
</script>