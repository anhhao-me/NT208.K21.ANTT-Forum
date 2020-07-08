<template>
  <div class="badge text-danger">{{ like }} lượt thích</div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: [
    'topic'
  ],
  data(){
    return {
      like: 0
    }
  },
  methods: {
    ...mapMutations(['onload', 'outload']),
  },
  async mounted(){
    this.onload();
    this.like = (await this.$axios.$get(`/topic/${this.topic}/likes/`)).number_of_likes;
    this.outload();
  }
}
</script>

<style>

</style>