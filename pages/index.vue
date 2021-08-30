<template>
  <main id="main" role="main" class="gallery">
    <NuxtLink class="post" v-for="project in projects" :key="project.slug" :title="project.title" :to="{ name: 'projects-slug', params: { slug: project.slug } }">
      <LazyImage :src="`/assets/img/projects/${project.slug}.png`" :alt="project.title" />
      <div class="overlay">
        <h2 class="title">{{ project.title }}</h2>
        <span class="date">{{ formatDate(project.date) }}</span>
      </div>
    </NuxtLink>
  </main>
</template>

<script>
  export default {
    layout: 'index',
    head() {
      return {
        bodyAttrs: {
          class: 'home'
        }
      }
    },
    async asyncData ({ $content }) {
      const projects = await $content('projects')
        .only(['title', 'date', 'slug'])
        .sortBy('date', 'desc')
        .fetch();
      return {
        projects
      }
    },
    methods: {
      formatDate(date) {
        const options = { 
            year:  'numeric',
            month: 'long',
            day:   'numeric'
        }
        return new Date(date).toLocaleDateString('es', options);
      }
    },
  }
</script>