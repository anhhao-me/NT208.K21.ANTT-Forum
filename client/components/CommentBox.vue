<template>
  <b-media vertical-align="top">
    <template v-slot:aside>
      <b-img :src="randomAvatar(comment.user_username)" width="64" alt="placeholder" rounded="circle"/>
    </template>
    <p class="mb-2 d-flex justify-content-between">
      <b>{{ comment.user_username }}</b>
      <i class="text-secondary">
        <small>
          <b>{{ formatDate(comment.created_at) }}</b>
        </small>
      </i>
    </p>
    <div v-html="comment.content"></div>
    <div class="text-right">
      <!--div class="badge text-danger">371 lượt thích</div>
      <b-button variant="outline-danger" size="sm">Thích</b-button-->
      <b-button :variant="!commentLiked ? 'danger' : 'outline-danger'" size="sm" @click="toggleLikeComment" v-if="user">{{ !commentLiked ? 'Thích' : 'Đã thích' }}</b-button>
      <b-button variant="outline-secondary" size="sm" v-if="user && comment.user_id === user.id" @click="editComment(comment)">Chỉnh sửa</b-button>
      <b-button variant="outline-primary" size="sm" href="#comment-box" @click="makeReply(comment)">Trả lời</b-button>
    </div>

    <div v-if="comment.children" class="mt-3">
      <comment-box :comment="subcomment" v-for="subcomment in comment.children" :key="`comment-${subcomment.id}`" @reply="makeReply" @edit="editComment"></comment-box>
    </div>
  </b-media>
</template>

<script>
import CommentBox from './CommentBox';
import { mapMutations, mapState } from 'vuex';
import moment from 'moment';
import { nanoid } from 'nanoid';

export default {
  components: {
    CommentBox
  },
  data(){
    return {
      commentLiked: false
    }
  },
  name: 'comment-box',
  props: [
    'comment'
  ],
  computed: {
    ...mapState(['user']),
  },
  methods: {
    makeReply(comment){
      this.$emit('reply', comment);
    },
    editComment(comment){
      this.$emit('edit', comment);
    },
    formatDate(d){
      return moment(d).format('YYYY/MM/DD HH:mm:ss')
    },
    randomAvatar(seed = nanoid()){
      return `https://icotar.com/avatar/${seed}`;
    },
    async toggleLikeComment(){
      if (!this.user){
        // this.notify({ msg: 'Vui lòng đăng nhập để thích!', variant: 'warning' });
        return;
      }

      if (!this.comment)
        return;

      this.onload();
      try {
        const tid = await this.$axios.$post('/topic/liked/', {
          user_id: this.user.id,
          topic_id: this.topic.id
        });
        
        if (tid){
          this.topicLiked = true;
          this.likeCount++;
          // this.notify({ msg: 'Đã thích!', variant: 'success'});
        } else {
          this.topicLiked = false;
          this.likeCount--;
          // this.notify({ msg: 'Đã bỏ thích!', variant: 'success'});
        }
      } catch(err){
        this.notify({ msg: `Đã xảy ra lỗi - ${err.message}`, variant: 'danger'});
      }
      this.outload();
    },
  }
}
</script>

<style>

</style>