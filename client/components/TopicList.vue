<template>
  <b-list-group>
    <b-list-group-item v-for="topic in limitTopics" :key="`topic-${id}-${topic.id}`" class="p-3">
      <b-media vertical-align="center">
        <!--template v-slot:aside>
          <b-img :src="randomAvatar()" width="64" alt="placeholder"/>
        </template-->
        <h5>
          <nuxt-link :to="`/topic/${topic.id}`">
            {{ truncateText(topic.title, 60) }}
          </nuxt-link>
        </h5>
        <p>
          {{ truncateText(topic.content, 128) }}
        </p>
        <div class="text-right">
          <TopicView :topic="topic.id"/>
          <TopicLike :topic="topic.id"/>
          <!-- <div class="badge">126 lượt xem</div>
          <div class="badge text-danger">371 lượt thích</div>
          <div class="badge text-info">17 bình luận</div> -->
          <nuxt-link :to="`/topic/${topic.id}#comment-box`" class="btn btn-primary btn-sm">Bình luận ngay</nuxt-link>
        </div>
      </b-media>
    </b-list-group-item>
    <div class="mt-3 text-center" v-if="more && page * limit < topics.length">
      <b-button variant="outline-primary" @click="page++">Tải thêm</b-button>
    </div>
  </b-list-group>
</template>

<script>
import { nanoid } from 'nanoid';
import { mapMutations } from 'vuex';
import uniqid from 'uniqid';
import TopicView from './TopicView';
import TopicLike from './TopicLike';
import htmlToText from 'html-to-text';

export default {
  name: 'topic-list',
  components: {
    TopicView,
    TopicLike
  },
  props: ['category', 'more', 'input'],
  data(){
    return {
      id: uniqid(),
      categories: [],
      topics: [],
      page: 1,
      limit: 10
    }
  },
  computed: {
    limitTopics(){
      return this.topics.slice(0, this.page * this.limit)
    }
  },
  methods: {
    ...mapMutations(['onload', 'outload']),
    randomAvatar(seed = nanoid()){
      return `https://icotar.com/avatar/${seed}`;
    },
    truncateText(text, length){
      text = htmlToText.fromString(text, {
        wordwrap: false,
        noLinkBrackets: true,
        ignoreHref: true,
        ignoreImage: true
      });

      return text.length > length - 3 ? text.substr(0, length - 3) + '...' : text;
    }
  },  
  async mounted(){
    this.onload();
    if (!this.input){
      this.topics = (await this.$axios.$get(`/topic/list`)).reverse();
      if (this.category){
        this.topics = this.topics.filter(t => t.category === this.category);
      }
    } else {
      this.topics = this.input;
    }
    this.outload();
  }
}
</script>

<style>

</style>