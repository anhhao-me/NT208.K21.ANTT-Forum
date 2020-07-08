<template>
  <b-container class="my-md-3 my-1">
    <b-card
        title="Chỉnh sửa thảo luận"
        class="my-3" 
        v-if="user"
      >
        <b-alert variant="danger" show v-if="error">{{ error }}</b-alert>
        <b-card-text>
          <b-form-group label="Tiêu đề">
            <b-input type="text" v-model="title"></b-input>
          </b-form-group>
          <b-form-group label="Nội dung">
            <vue-editor v-model="content" />
            <!-- <b-form-textarea
              placeholder="Nội dung bạn muốn thảo luận..."
              max-rows="999999"
              rows="5"
              v-model="content"
            ></b-form-textarea> -->
          </b-form-group>
          <b-form-group>
            <b-button @click="save">Lưu</b-button>
          </b-form-group>
        </b-card-text>
    </b-card>
    <b-alert variant="warning" show v-if="!user">Vui lòng đăng nhập để tạo thảo luận!</b-alert>
  </b-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  data(){
    const topic_id = parseInt(this.$route.params.id);
    
    let list = [];
    for (let i = 0; i < 5; i++)
      list.push(i);

    return {
      id: isNaN(topic_id) ? null : topic_id,
      title: '',
      content: '',
      error: '',
      topics: [],
      topic: null
    }
  },
  computed: {
    ...mapState(['user']),

    maskCategories(){
      
    }
  },
  methods: {
    ...mapMutations(['onload', 'outload', 'notify']),

    async save(){
      if (!this.title || !this.content){
        this.error = 'Vui lòng điền đầy đủ các trường';
        return;
      }

      this.onload();
      try {
        const info = await this.$axios.$patch(`/topic/${this.id}/update/`, {
          title: this.title,
          content: this.content
        });

        this.$router.push(`/topic/${info.id}`);
        this.notify({ msg: 'Đã lưu!', variant: 'success'});
      } catch(err){
        this.error = `Đã xảy ra lỗi - ${err.message}`;
      }
      this.outload();
    },

    makeCategoryTree(parent, sub = ''){
      let result = [];

      for (let category of this.categories){
        if (category.parent === parent){
          result.push({
            target: category,
            label: `${sub} ${category.name}`
          });
          result = [...result, ...this.makeCategoryTree(category.id, `${sub}-`)];
        }
      }

      return result;
    }
  },
  async mounted(){
    this.onload();
    if (!this.id){
      this.$router.push('/404');
      return;
    }

    try {
      const res = await this.$axios.$get(`/topic/${this.id}/comment`);
      this.topics = await this.$axios.$get(`/topic/list`);
      this.topic = this.topics.filter(t => t.id === this.id)[0];
      this.title = this.topic.title;
      this.content = this.topic.content;
    } catch(err){
      console.error(err);
      if (err.response.status)
        this.$router.push('/404');
    }
    this.outload();
  }
}
</script>

<style>

</style>