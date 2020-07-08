<template>
  <b-container class="my-md-3 my-1">
    <b-row>
      <b-col cols="12" lg="8">
        <b-card
          class="my-3"
          id="news"  
        >
          <b-card-text>
            <b-breadcrumb>
              <b-breadcrumb-item href="/category">Tin tức</b-breadcrumb-item>
              <b-breadcrumb-item active>Drama</b-breadcrumb-item>
            </b-breadcrumb>
            <h4 class="my-3">Drama</h4>
            <b-list-group>
              <b-list-group-item v-for="i in list" :key="`recent-${i}`" class="p-3">
                <b-media vertical-align="center">
                  <template v-slot:aside>
                    <b-img :src="randomAvatar()" width="64" alt="placeholder"/>
                  </template>
                  <h5>
                    <nuxt-link to="/topic">
                      {{ truncateText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget congue leo.', 60) }}
                    </nuxt-link>
                  </h5>
                  <p>
                    {{ truncateText('Nam lobortis felis sapien, quis semper quam scelerisque quis. Curabitur vel risus ultricies tortor viverra lobortis. Quisque imperdiet turpis sit amet placerat lacinia. Proin gravida sollicitudin purus, non condimentum ante eleifend et. Morbi placerat bibendum mi, in posuere nunc ultrices sed. Nulla nec ligula molestie, feugiat quam et, molestie est. Integer porta faucibus felis, sit amet iaculis elit eleifend sit amet.', 128) }}
                  </p>
                  <div class="text-right">
                    <div class="badge">126 lượt xem</div>
                    <div class="badge text-danger">371 lượt thích</div>
                    <div class="badge text-info">17 bình luận</div>
                    <nuxt-link to="/topic" class="btn btn-primary btn-sm">Bình luận ngay</nuxt-link>
                  </div>
                </b-media>
              </b-list-group-item>
            </b-list-group>
            <div class="text-center mt-3">
              <nuxt-link to="/category" class="btn btn-primary btn-sm">Xem thêm</nuxt-link>
            </div>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col cols="12" lg="4">
        <div class="py-3 sticky">
          <b-card>
            <b-card-text>
              <h5>Chuyên mục khác</h5>
              <b-list-group>
                <b-list-group-item class="p-3">
                  <nuxt-link to="/subcategory" class="d-block w-100">
                    <b-img :src="randomAvatar()" width="32" alt="placeholder" class="mr-2" rounded="circle" style="vertical-align: middle"/>
                    <span style="font-size: .8em; font-weight: bold; text-transform: uppercase">Heo thỳ</span>
                  </nuxt-link>
                </b-list-group-item>
                <b-list-group-item class="p-3">
                  <nuxt-link to="/subcategory" class="d-block w-100">
                    <b-img :src="randomAvatar()" width="32" alt="placeholder" class="mr-2" rounded="circle" style="vertical-align: middle"/>
                    <span style="font-size: .8em; font-weight: bold; text-transform: uppercase">Ba lần</span>
                  </nuxt-link>
                </b-list-group-item>
                <b-list-group-item class="p-3">
                  <nuxt-link to="/subcategory" class="d-block w-100">
                    <b-img :src="randomAvatar()" width="32" alt="placeholder" class="mr-2" rounded="circle" style="vertical-align: middle"/>
                    <span style="font-size: .8em; font-weight: bold; text-transform: uppercase">Tình yêu</span>
                  </nuxt-link>
                </b-list-group-item>
                <b-list-group-item class="p-3">
                  <nuxt-link to="/subcategory" class="d-block w-100">
                    <b-img :src="randomAvatar()" width="32" alt="placeholder" class="mr-2" rounded="circle" style="vertical-align: middle"/>
                    <span style="font-size: .8em; font-weight: bold; text-transform: uppercase">Hôn nhân</span>
                  </nuxt-link>
                </b-list-group-item>
              </b-list-group>
            </b-card-text>
          </b-card>
          <b-card class="my-3">
            <b-card-text>
              <h5>Chuyên mục</h5>
              <b-list-group>
                <b-list-group-item to="/category">
                  Thảo luận mới nhất
                  <b-badge variant="primary">10+</b-badge>
                </b-list-group-item>
                <b-list-group-item to="/category">
                  Tin tức
                  <b-badge variant="primary">10+</b-badge>
                </b-list-group-item>
                <b-list-group-item to="/category">
                  Học tập
                  <b-badge variant="primary">10+</b-badge>
                </b-list-group-item>
                <b-list-group-item to="/category">
                  Cuộc sống
                  <b-badge variant="primary">10+</b-badge>
                </b-list-group-item>
                <b-list-group-item to="/category">
                  Mua bán trao đổi
                  <b-badge variant="primary">10+</b-badge>
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

export default {
  data(){
    let list = [];
    for (let i = 0; i < 5; i++)
      list.push(i);

    return {
      list
    }
  },
  methods: {
    randomAvatar(){
      return `https://icotar.com/avatar/${nanoid()}`;
    },
    truncateText(text, length){
      return text.length > length - 3 ? text.substr(0, length - 3) + '...' : text;
    }
  }
}
</script>

<style>

</style>