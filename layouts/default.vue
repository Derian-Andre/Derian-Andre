<template>
  <div class="layout">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
  export default {
    mounted() {
      const root    = document.documentElement,
            header  = document.querySelector('header.header') || null,
            info    = document.getElementById('info') || null;
      function rootVariables() {
        if(header) root.style.setProperty('--header-width', header.offsetWidth + 'px');
        if(info)   root.style.setProperty('--info-width',   info.offsetWidth + 'px');
      }
      rootVariables();
      window.addEventListener('resize', rootVariables, false);
    }
  }
</script>