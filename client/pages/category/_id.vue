<template>
  <b-container class="my-md-3 my-1" v-if="category">
    <b-row>
      <b-col cols="12" lg="8">
        <b-card
          class="my-3"
          id="news"  
        >
          <b-card-text>
            <b-breadcrumb :items="breadcrumbCategory"/>
            <div class="mb-3 d-flex justify-content-between">
              <h4><nuxt-link :to="`/category/${category.id}`" style="color: black;">{{ category.name }}</nuxt-link></h4>
              <div>
                <nuxt-link :to="`/new-topic#category=${category.id}`" class="btn btn-info btn-sm">Tạo thảo luận</nuxt-link>
              </div>
            </div>
            <topic-list :category="id" :more="true"/>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col cols="12" lg="4">
        <div class="py-3 sticky">
          <b-card v-if="categories.filter(c => c.parent === id).length">
            <b-card-text>
              <h5>Chuyên mục con</h5>
              <b-list-group>
                <b-list-group-item class="p-3" v-for="category in categories.filter(c => c.parent === id)" :key="`subcat-${category.id}`">
                  <nuxt-link :to="`/category/${category.id}`" class="d-block w-100">
                    <b-img :src="randomAvatar(category.name)" width="32" alt="placeholder" class="mr-2" rounded="circle" style="vertical-align: middle"/>
                    <span style="font-size: .8em; font-weight: bold; text-transform: uppercase">{{ category.name }}</span>
                  </nuxt-link>
                </b-list-group-item>
              </b-list-group>
            </b-card-text>
          </b-card>
          <b-card
            title="Chuyên mục khác"
            class="my-3"
          >
            <b-card-text>
              <b-list-group>
                <b-list-group-item :to="`/category/${category.id}`" v-for="category in categories.filter(c => c.parent === category.parent)" :key="`toc-${category.id}`">
                  {{ category.name }}
                  <!--b-badge variant="primary">10+</b-badge-->
                </b-list-group-item>
              </b-list-group>
            </b-card-text>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { nanoid } from 'nanoid';
import { mapMutations, mapState } from 'vuex';
import TopicList from '../../components/TopicList';
import KhongDau from 'khong-dau';

export default {
  components: {
    TopicList
  },
  data(){
    const cat_id = parseInt(this.$route.params.id);
    
    let list = [];
    for (let i = 0; i < 5; i++)
      list.push(i);

    return {
      id: isNaN(cat_id) ? null : cat_id,
      categories: [],
      list,
      category: null
    }
  },
  computed: {
    breadcrumbCategory(){
      const result = [{
        text: this.category.name,
        href: `/category/${this.category.id}`
      }];

      let cid = this.category.parent;

      while (cid){
        let current = this.categories.filter(cat => cat.id === cid)[0];
        cid = null;
        if (current){
          result.unshift({
            text: current.name,
            href: `/category/${current.id}`
          });

          cid = current.parent;
        }
      }

      return result;
    }
  },
  methods: {
    ...mapMutations(['onload', 'outload']),
    toURL(name){
      return KhongDau(name, ['chuyen', 'url']).toLowerCase()
    },
    randomAvatar(seed = nanoid()){
      return `https://icotar.com/avatar/${seed}`;
    },
    truncateText(text, length){
      return text.length > length - 3 ? text.substr(0, length - 3) + '...' : text;
    }
  },
  async mounted(){
    this.onload();
    this.categories = await this.$axios.$get('/category/list');
    this.category = this.categories.filter(c => c.id === this.id)[0];
    this.outload();
  }
}
</script>

<style>

</style>