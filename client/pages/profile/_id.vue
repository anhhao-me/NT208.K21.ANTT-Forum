<template>
  <b-container class="my-md-3 my-1" v-if="profile">
    <b-row>
      <b-col cols="12">
        <b-card
          class="my-3"
          :title="profile.username"
        >
          <b-card-text>
            <b-row>
              <b-col cols="12" lg="6">
                <h6>Thảo luận gần đây</h6>
                <TopicList :input="profile.user_topic"/>
              </b-col>
              <b-col cols="12" lg="6">
                <h6>Bình luận gần đây</h6>
                <b-list-group>
                  <b-list-group-item :to="`/topic/${comment.topic}`" v-for="comment in profile.user_comment" :key="`comment-${comment.id}`" v-html="render(comment.content)">
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { nanoid } from 'nanoid';
import { mapMutations, mapState } from 'vuex';
import TopicList from '../../components/TopicList';
import KhongDau from 'khong-dau';
import marked from 'marked';

export default {
  components: {
    TopicList
  },
  data(){
    const profile_id = parseInt(this.$route.params.id);
    
    let list = [];
    for (let i = 0; i < 5; i++)
      list.push(i);

    return {
      id: isNaN(profile_id) ? null : profile_id,
      profile: null
    }
  },
  computed: {
  },
  methods: {
    ...mapMutations(['onload', 'outload']),
    randomAvatar(seed = nanoid()){
      return `https://icotar.com/avatar/${seed}`;
    },
    render(content){
      return marked(content);
    },
  },
  async mounted(){
    this.onload();
    this.profile = await this.$axios.$get(`/user/${this.id}/info/`);
    console.log(this.profile);
    this.outload();
  }
}
</script>

<style>

</style>