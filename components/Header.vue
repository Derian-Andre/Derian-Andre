<template>
  <header class="header">
    <NuxtLink class="logo" to="/">
      <h1>Derian André Castillo Franco</h1>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 195 200">
        <title>Derian André Logo</title>
        <defs>
          <linearGradient id="a" x1="115" y1="210" x2="150" y2="165" gradientUnits="userSpaceOnUse">
            <stop offset="0.5" stop-color="white"></stop>
            <stop offset="1" stop-color="#ededed"></stop>
          </linearGradient>
        </defs>
        <path d="M94,0,0,200l40.72-13.23L94,73.93Zm6.26,0V74.71l39.16,80.93L70.48,177.43,195,200Z" fill="white" fill-rule="evenodd"></path>
        <path d="M195,200l-55.6-44.36L70.48,177.43Z" fill-rule="evenodd" fill="url(#a)"></path>
      </svg>
    </NuxtLink>
    <div class="wrapper">
      <nav>
        <NuxtLink to="/">Inicio</NuxtLink>
        <NuxtLink to="/blog/">Blog</NuxtLink>
        <NuxtLink to="/servicios/">Work</NuxtLink>
        <NuxtLink to="/curriculum/">Ego</NuxtLink>
        <a role="button" id="toggler" class="toggler" title="Cambiar el tema"></a>
      </nav>
    </div>
    <a class="footer" href="mailto:hola@derianandre.com" title="Mándame un correo">
      <i class="bi bi-envelope"></i>
      <span class="visually-hidden">Mándame un correo</span>
    </a>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        themes: {
          'dark':   'Dark',
          'light':  'Light',
          'system': 'Sistema'
        },
      }
    },
  }
</script>