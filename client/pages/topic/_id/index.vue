<template>
  <b-container class="my-md-3 my-1" v-if="topic">
    <b-row>
      <b-col cols="12" lg="8">
        <b-card
          class="my-3" 
        >
          <b-card-text>
            <b-breadcrumb :items="breadcrumbCategory"/>
            <h4>{{ topic.title }}</h4>
            <div class="info my-2 d-flex justify-content-between" >
              <div class="status">
                <div class="badge">{{ viewCount }} lượt xem</div>
                <div class="badge text-danger">{{ likeCount }} lượt thích</div>
                <div class="badge text-info">{{ this.comments.length }} bình luận</div>
              </div>
              <div class="date">
                <i class="text-secondary">
                  <small>
                    <b>{{ formatDate(topic.created_at) }}</b>
                  </small>
                </i>
              </div>
            </div>
            <div class="content">
              <div v-html="topic.content"></div>
              <p class="text-right">
                <small>
                  <i>
                    <b-icon icon="person-fill"/> <b>{{ author ? author.username : topic.user }}</b>
                  </i>
                </small>
              </p>
            </div>
            <div class="action">
              <b-button :variant="!topicLiked ? 'danger' : 'outline-danger'" size="sm" @click="toggleLikeTopic">{{ !topicLiked ? 'Thích' : 'Đã thích' }}</b-button>
              <b-button variant="primary" size="sm" href="#comment-box">Bình luận</b-button>
              <ShareNetwork
                  network="facebook"
                  :url="`https://xanh.life/topic/${topic.id}`"
                  :title="topic.title"
                  class="btn btn-secondary btn-sm text-light"
                  style="background-color: #4268b3"
                >
                  Chia sẻ
              </ShareNetwork>
              <b-button variant="outline-secondary" size="sm" :to="`/topic/${id}/edit`" v-if="user && author && user.
              id === author.id">Chỉnh sửa</b-button>
              <!-- <b-button variant="outline-secondary" size="sm" @click="removeTopic" v-if="user && author && user.
              id === author.id">Xóa</b-button> -->
            </div>
          </b-card-text>
        </b-card>
        <h5>THẢO LUẬN</h5>
        <b-card class="my-3" v-for="comment in makeTree(comments)" :key="`comment-${comment.id}`">
          <b-card-text>
            <comment-box :comment="comment" @reply="makeReply" @edit="editComment"></comment-box>
          </b-card-text>
        </b-card>
        <b-modal title="Chỉnh sửa bình luận" id="edit-comment" @ok="makeEditComment">
          <b-form-group v-if="user">
            <vue-editor v-model="editCommentForm.content"  :editor-toolbar="commentToolbar" />
          </b-form-group>
        </b-modal>
        <!--div class="text-center my-3">
          <b-button variant="primary" size="sm">Tải thêm</b-button>
        </div-->
        <b-card id="comment-box">
          <b-card-text>
            <h6>BÌNH LUẬN</h6>
            <b-form-group v-if="user">
              <vue-editor v-model="commentContent" :editor-toolbar="commentToolbar"/>
            </b-form-group>
            <b-form-group class="my-0" v-if="user">
              <b-button variant="primary" size="sm" @click="makeComment">Bình luận</b-button>
            </b-form-group>
            <b-alert variant="warning" show v-if="!user">Vui lòng đăng nhập để bình luận!</b-alert>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col cols="12" lg="4">
        <div class="py-3 sticky">
          <b-card v-if="categories.filter(c => c.parent === topic.category).length" class="mb-3">
            <b-card-text>
              <h5>Chuyên mục con</h5>
              <b-list-group>
                <b-list-group-item class="p-3" v-for="category in categories.filter(c => c.parent === topic.category)" :key="`subcat-${category.id}`">
                  <nuxt-link :to="`/category/${category.id}`" class="d-block w-100">
                    <b-img :src="randomAvatar(category.name)" width="32" alt="placeholder" class="mr-2" rounded="circle" style="vertical-align: middle"/>
                    <span style="font-size: .8em; font-weight: bold; text-transform: uppercase">{{ category.name }}</span>
                  </nuxt-link>
                </b-list-group-item>
              </b-list-group>
            </b-card-text>
          </b-card>
          <!-- <b-card
            class="my-3"
            id="life"  
          >
            <b-card-text>
              <h5>Đề xuất</h5>
              <b-list-group>
                <b-list-group-item v-for="i in list" :key="`recent-${i}`" class="p-3">
                  <b-media vertical-align="center">
                    <h6>
                      <nuxt-link to="/topic">
                        {{ truncateText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget congue leo.', 48) }}
                      </nuxt-link>
                    </h6>
                  </b-media>
                </b-list-group-item>
              </b-list-group>
            </b-card-text>
          </b-card> -->
          <b-card>
            <b-card-text>
              <h5>Chuyên mục</h5>
              <b-list-group>
                <b-list-group-item :to="`/category/${category.id}`" v-for="category in categories.filter(s => s.parent === null)" :key="`side-category-${category.id}`">
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
import moment from 'moment';
import marked from 'marked';
import CommentBox from '../../../components/CommentBox';

export default {
  components: {
    CommentBox
  },
  data(){
    const topic_id = parseInt(this.$route.params.id);
    
    let list = [];
    for (let i = 0; i < 5; i++)
      list.push(i);

    return {
      list,
      id: isNaN(topic_id) ? null : topic_id,
      topic: null,
      topics: [],
      categories: [],
      author: null,
      topicLiked: false,
      likeCount: 0,
      viewCount: 0,
      commentContent: '',
      comments: [],
      editCommentForm: {
        content: '',
        id: '',
        target: null
      },
      commentToolbar: [
        ["bold", "italic", "underline"],
        ["link", "image"]
      ],
      commentReply: null
    }
  }, 
  computed: {
    ...mapState(['user']),

    breadcrumbCategory(){
      if (!this.topic)
        return [];

      const result = [{
        text: this.topic.title,
        href: `/topic/${this.topic.id}`
      }];

      if (!this.topic.category){
        return result;
      }

      let cid = this.topic.category;

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
    ...mapMutations(['onload', 'outload', 'notify']),
    randomAvatar(seed = nanoid()){
      return `https://icotar.com/avatar/${seed}`;
    },
    truncateText(text, length){
      return text.length > length - 3 ? text.substr(0, length - 3) + '...' : text;
    },
    formatDate(d){
      return moment(d).format('YYYY/MM/DD HH:mm:ss')
    },
    render(content){
      return marked(content);
    },
    async toggleLikeTopic(){
      if (!this.user){
        // this.notify({ msg: 'Vui lòng đăng nhập để thích!', variant: 'warning' });
        return;
      }

      if (!this.topic)
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
    async makeComment(){
      if (!this.commentContent || !this.user){
        return;
      }


      this.onload();
      try {
        const payload = {
          user: this.user.id,
          topic: this.topic.id,
          content: this.commentContent
        };

        if (this.commentReply)
          payload.parent = this.commentReply;

        const cid = await this.$axios.$post('/comment/create/', payload);

        this.commentContent = '';
        this.commentReply = null;

        this.notify({ msg: 'Đã thêm bình luận!', variant: 'success'});
      } catch(err){
        this.notify({ msg: `Đã xảy ra lỗi - ${err.message}`, variant: 'danger'});
      }
      this.outload();
      location.reload();
    },
    editComment(comment){
      this.editCommentForm.content = comment.content;
      this.editCommentForm.id = comment.id;
      this.editCommentForm.target = comment;
      this.$bvModal.show('edit-comment');
    },
    async makeEditComment(){
      await this.$axios.$patch(`/comment/${this.editCommentForm.id}/update/`, {
        content: this.editCommentForm.content
      });

      this.editCommentForm.target.content = this.editCommentForm.content;
      this.notify({ msg: 'Đã sửa bình luận!', variant: 'success'});
    },
    async makeReply(comment){
      this.commentContent = `<strong>@${comment.user_username}</strong>&nbsp;`;
      this.commentReply = comment.id;
    },
    makeTree(list, parent = null){
      return list.filter(item => item.parent === parent)
      .map(item => {
        return Object.assign(item, {
          children: this.makeTree(list, item.id)
        });
      });
    }
  },
  async mounted(){
    this.$bvModal.hide('search-result');
    this.onload();
    if (!this.id){
      this.$router.push('/404');
      return;
    }

    try {
      const res = await this.$axios.$get(`/topic/${this.id}/comment`);
      this.topics = await this.$axios.$get(`/topic/list`);
      this.topic = this.topics.filter(t => t.id === this.id)[0];
      this.comments = res[1].comment_data;
      
      if (this.topic.user){
        this.author = await this.$axios.$get(`/user/${this.topic.user}/info`);
      }

      await this.toggleLikeTopic();
      await this.toggleLikeTopic();

      this.likeCount = (await this.$axios.$get(`/topic/${this.id}/likes/`)).number_of_likes;
      await this.$axios.$get(`/topic/${this.id}/views/count`);
      
      this.viewCount = (await this.$axios.$get(`/topic/${this.id}/views/`)).number_of_views;

      this.categories = await this.$axios.$get('/category/list/');

    } catch(err){
      if (err.response.status)
        this.$router.push('/404');
    }
    this.outload();
  }
}
</script>

<style lang="scss">
.content {
  img {
    max-width: 100%;
  }
}
</style>