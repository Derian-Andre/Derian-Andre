<template>
  <section :id="`${type}-${name}`">
    <Figure class="figure-logo" :src="`curriculum/${name}.svg`" />
    <h4 class="title">
      {{ $t(`curriculum.experience.${type}.${name}.title`) }}
    </h4>
    <h5 class="subtitle">
      {{ $t(`curriculum.experience.${type}.${name}.subtitle`) }}
    </h5>
    <h6 class="date">
      <Time :date="dateStart" v-if="dateStart"/>
      —
      <Time :date="dateEnd" v-if="dateEnd"/>
      <Time :date="dateToday" v-else>
        {{ $t(`curriculum.experience.current`) }}
      </Time>
      {{ duration }}
    </h6>
    <p class="description mb-2"
      v-html="$t(`curriculum.experience.${type}.${name}.description`)">
    </p>
    <div class="hstack-skills hstack-skills-experience hstack gap-2 flex-wrap mb-5" v-if="stack">
      <template v-for="item in stack">
        <Figure :src="`curriculum/icons/${item}.svg`" :title="item"/>
      </template>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      },
      type: {
        type: String,
        required: true
      },
    },
    computed: {
      name() {
        const slug = this.data.slug;
        return slug;
      },
      dateStart() {
        return this.data.dateStart;
      },
      dateEnd() {
        return this.data.dateEnd;
      },
      dateToday() {
        const today = new Date();
        return today.toISOString();
      },
      duration() {
        const dateToday = new Date();
        const dateStart = new Date(this.data.dateStart);
        const dateEnd = this.data.dateEnd ? new Date(this.data.dateEnd) : dateToday;
        // Get years and months between dates
        const daysDiff = Math.ceil((Math.abs(dateStart - dateEnd)) / (1000 * 60 * 60 * 24));
        const years = Math.floor(daysDiff / 365.25);
        const remainingDays = Math.floor(daysDiff - (years * 365.25));
        const months = Math.floor((remainingDays / 365.25) * 12);
        const days = Math.ceil(daysDiff - (years * 365.25 + (months / 12 * 365.25)));
        // Format duration
        let duration = ' ·';
        if (years > 0) {
          duration += ` ${this.$tc('curriculum.experience.years', years)}`;
        }
        if (months > 0) {
          duration += ` ${this.$tc('curriculum.experience.months', months)}`;
        }
        if (days > 0) {
          duration += ` ${this.$tc('curriculum.experience.days', days)}`;
        }
        return duration;
      },
      stack() {
        const stack = this.data.stack && this.data.stack.length > 0 ? this.data.stack : false;
        return stack;
      },
    },
  }
</script>