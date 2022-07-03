<template>
  <time :datetime="date">
    <template v-if="$slots.default">
      <slot/>
    </template>
    <template v-else>
      {{ formatedDate }}
    </template>
  </time>
</template>

<script>
  import Utils from '~/utils';
  export default {
    props: {
      date: {
        type: String,
        required: true
      }
    },
    methods: {
      hasSlot() {
        return this.$slots.default ? true : false;
      },
    },
    computed: {
      formatedDate() {
        const date = this.date;
        const locale = this.$i18n.locale;
        return Utils.formatDate(date, locale);
      }
    }
  }
</script>