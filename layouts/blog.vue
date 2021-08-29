<template>
  <div class="layout">
    <Header />
    <main role="main" id="main" class="page blog">
      <section id="info" class="info">
        <h1 id="title" class="title"><span>{{ name }}</span></h1>
      </section>
      <section id="content" class="content">
        <Nuxt />
      </section>
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
      name() {
        return this.$store.getters['page/getName']
      }
    }
  }
</script>