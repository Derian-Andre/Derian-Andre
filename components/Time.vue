<template>
  <time :datetime="date">
    {{ formatedDate }}
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
    computed: {
      formatedDate() {
        let locale = this.$i18n.locale,
            date = this.date;
        return Utils.formatDate(locale, date);
      }
    }
  }
</script>