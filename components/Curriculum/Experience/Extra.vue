<template>
  <section :id="`${company}-${data.slug}`" class="mb-4">
    <Figure :src="`curriculum/icons/${data.type}.svg`" />
    <h4 class="subtitle">
      {{ subtitle }}
    </h4>
    <h5 class="title">
      {{ title }}
      <small class="opacity-50" v-if="data.id">
        [{{ data.id }}]
      </small>
    </h5>
    <h6 class="date">
      {{ date }}
    </h6>
    <p class="description" v-if="description" v-html="description" />
    <a :href="data.url" v-if="data.url" target="_blank" class="btn btn-outline-link h6 small text-uppercase">
      {{ $t(`curriculum.experience.${type}.btn`) }}
      <i class="bi bi-box-arrow-up-right ms-1" />
    </a>
  </section>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true
      },
      data: {
        type: Object,
        required: true
      },
    },
    computed: {
      companyName() {
        return this.$t(`curriculum.experience.${this.type}.items.${this.company}.title`);
      },
      title() {
        return this.$t(`curriculum.experience.${this.type}.items.${this.company}.items.${this.data.slug}.title`);
      },
      subtitle() {
        return this.$t(`curriculum.experience.${this.type}.types.${this.data.type}`);
      },
      date() {
        if(!this.data.date) return this.$i18n.t('curriculum.experience.in-progress');
        return new Date(this.data.date).toLocaleDateString(this.$i18n.locale, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      },
      description() {
        return this.$t(`curriculum.experience.${this.type}.items.${this.company}.items.${this.data.slug}.description`);
      },
    }
  }
</script>