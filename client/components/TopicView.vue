<template>
  <div class="badge">{{ view }} lượt xem</div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: [
    'topic'
  ],
  data(){
    return {
      view: 0
    }
  },
  methods: {
    ...mapMutations(['onload', 'outload']),
  },
  async mounted(){
    this.onload();
    this.view = (await this.$axios.$get(`/topic/${this.topic}/views/`)).number_of_views;
    this.outload();
  }
}
</script>

<style>

</style>