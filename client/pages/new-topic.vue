<template>
  <b-container class="my-md-3 my-1">
    <b-card
        title="Thảo luận mới"
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
          <b-form-group label="Chuyên mục">
            <b-form-select v-model="category" :options="makeCategoryTree(null).map(c => ({ value: c.target.id, text: c.label }))"></b-form-select>
          </b-form-group>
          <b-form-group>
            <b-button @click="create">Tạo</b-button>
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
    const category = parseInt(location.hash.split('=')[1]);
    return {
      category: isNaN(category) ? null : category,
      categories: [],
      title: '',
      content: '',
      error: ''
    }
  },
  computed: {
    ...mapState(['user']),

    maskCategories(){
      
    }
  },
  methods: {
    ...mapMutations(['onload', 'outload', 'notify']),

    async create(){
      if (!this.title || !this.content || !this.category){
        this.error = 'Vui lòng điền đầy đủ các trường';
        return;
      }

      this.onload();
      try {
        const info = await this.$axios.$post('/topic/create/', {
          user: this.user.id,
          title: this.title,
          content: this.content,
          category: this.category
        });

        this.$router.push(`/topic/${info.id}`);
        this.notify({ msg: 'Đã tạo thảo luận thành công!', variant: 'success'});
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
    this.categories = await this.$axios.$get('/category/list');
    this.outload();
  }
}
</script>

<style>

</style>