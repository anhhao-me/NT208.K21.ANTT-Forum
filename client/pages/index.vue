<template>
  <b-container class="my-md-3 my-1">
    <b-row>
      <b-col cols="12" lg="8">
        <b-card
          title="Thảo luận mới nhất"
          class="my-3" 
          id="recent" 
        >
          <b-card-text>
            <topic-list/>
            <!--div class="text-center mt-3">
              <nuxt-link to="/category" class="btn btn-primary btn-sm">Xem thêm</nuxt-link>
            </div-->
          </b-card-text>
        </b-card>

        <b-card
          class="my-3"
          :id="toURL(category.name)"  
          v-for="category in categories.filter(c => !c.parent)"
          :key="`category-${category.id}`"
        >
          <b-card-text>
            <div class="mb-3 d-flex justify-content-between">
              <h4><nuxt-link :to="`/category/${category.id}`" style="color: black;">{{ category.name }}</nuxt-link></h4>
              <div>
                <nuxt-link :to="`/new-topic#category=${category.id}`" class="btn btn-info btn-sm">Tạo thảo luận</nuxt-link>
              </div>
            </div>
            <b-row class="mt-4 mb-2">
              <b-col cols="3" v-for="subcategory in categories.filter(c => c.parent === category.id)" :key="`subcategory-${subcategory.id}`">
                <nuxt-link :to="`/category/${subcategory.id}`" class="d-block w-100 text-center">
                  <b-img :src="randomAvatar(subcategory.name)" width="64" alt="placeholder" class="mb-3" rounded="circle"/>
                  <h4 style="font-size: 1em; text-transform: uppercase" class="mb-3">{{ subcategory.name }}</h4>
                </nuxt-link>
              </b-col>
            </b-row>
            <topic-list :category="category.id"/>
            <div class="text-center mt-3">
              <nuxt-link :to="`/category/${category.id}`" class="btn btn-sm btn-outline-primary">Xem thêm</nuxt-link>
            </div>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col cols="12" lg="4">
        <div class="py-3 sticky">
          <b-card
            title="Chuyên mục"
          >
            <b-card-text>
              <b-list-group>
                <b-list-group-item href="/#recent">
                  Thảo luận mới nhất
                  <!--b-badge variant="primary">10+</b-badge-->
                </b-list-group-item>
                <b-list-group-item :href="`/#${toURL(category.name)}`" v-for="category in categories.filter(c => c.parent === null)" :key="`toc-${category.id}`">
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
import TopicList from '../components/TopicList';
import KhongDau from 'khong-dau';

export default {
  components: {
    TopicList
  },
  data(){
    let list = [];
    for (let i = 0; i < 5; i++)
      list.push(i);

    return {
      list,
      categories: []
    }
  },
  computed: {
    ...mapState(['user'])
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
    this.outload();
  }
}
</script>

<style>
.bg-img {
  background-size: cover; 
  background-position: center;
}

.bg-square {
  width: 100%; 
  padding-top: 100%; 
}

.sticky {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
}
</style>