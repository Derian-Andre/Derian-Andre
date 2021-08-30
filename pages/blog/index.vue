<template>
   <section id="content" class="content">
      <h2 class="page-title">Más reciente</h2>
      <template v-for="(blog, index) in blogs">
         <NuxtLink class="post" :key="blog.slug" :to="{ name: 'blog-slug', params: { slug: blog.slug } }" :title="blog.title">
            <span class="date">{{ formatDate(blog.date) }}</span>
            <h3 class="title">{{ blog.title }}</h3>
         </NuxtLink>
         <hr v-if="index == 0" :key="index">
      </template>
      <hr>
      pagination
   </section>
</template>

<script>
   export default {
      layout: 'page',
      head() {
         return {
            title: 'Blog – Derian André',
            bodyAttrs: {
               class: 'blog'
            }
         }
      },
      async asyncData ({ $content }) {
         const blogs = await $content('blog')
            .only(['title', 'date', 'slug'])
            .sortBy('date', 'asc')
            .fetch();
         return {
            blogs
         }
      },
      created() {
         this.$store.commit('page/setTitle', 'Blog')
         this.$store.commit('page/setSubtitle', 'Lee mi mente')
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