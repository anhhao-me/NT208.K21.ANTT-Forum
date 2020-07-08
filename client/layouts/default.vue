<template>
  <div id="top">
    <div class="loading-wrapper" v-if="isLoading">
      <div class="loading loadingio-spinner-ellipsis-2dcycax0m2q"><div class="ldio-mosrpey9thc"><div></div><div></div><div></div><div></div><div></div></div></div>
    </div>
    <div :class="`notify-msg alert alert-${notifyVariant}`" v-if="notifyMsg">{{ notifyMsg }}</div>
    <a href="#top" class="btn btn-outline-primary rounded-pill" style="position: fixed; bottom: 1.5em; right: 1.5em;">
      <b-icon icon="caret-up-fill"/>
    </a>
    <b-navbar toggleable="lg" class="site-header">
      <b-navbar-brand to="/" class="font-weight-bold text-primary">
        <img src="@/assets/images/leaf.png" alt="Logo Forum" style="width: 32px; height: 32px; vertical-align: text-bottom;">
        XANH<small>.LIFE</small>
      </b-navbar-brand>
      <div class="d-none d-md-block">
        <small>
          <em>
            Forum Làng Đại Học
          </em>
        </small>
      </div>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!--b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav-->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <div class="d-flex search-box">
              <b-form-input size="sm" class="mr-2 rounded-pill" placeholder="Tìm kiếm" v-model="searchQuery"></b-form-input>
              <b-button size="sm" class="rounded-pill" type="submit" v-b-modal="'search-result'">
                <b-icon icon="search"/>
              </b-button>
              <div class="suggest shadow rounded" v-if="searchResult.length"> 
                <nuxt-link :to="`/topic/${topic.id}`" v-for="topic in searchResult" :key="`search-suggest-${topic.id}`">{{ topic.title }}</nuxt-link>
              </div>
            </div>
            <b-modal id="search-result" size="lg" title="Kết quả tìm kiếm" hide-footer>
              <TopicList :input="searchResult"/>
            </b-modal>
          </b-nav-item>
          <div class="d-none d-md-block vr"></div>
          <b-nav-item v-if="!user">
            <b-button size="sm" variant="primary" class="mr-1" v-b-modal.login>Đăng nhập</b-button>
            <b-button size="sm" variant="warning" class="ml-1" v-b-modal.create-account>Tạo tài khoản</b-button>
            <b-modal id="create-account" title="Tạo tài khoản" hide-footer @show="initCreateUserForm">
              <b-alert v-if="createUserForm.error" variant="danger" show>{{ createUserForm.error }}</b-alert>
              <b-form-group label="Tên đăng nhập">
                <b-input type="text" v-model="createUserForm.username"></b-input>
              </b-form-group>
              <b-form-group label="Email">
                <b-input type="text" v-model="createUserForm.email"></b-input>
              </b-form-group>
              <b-form-group label="Mật khẩu">
                <b-input type="password" v-model="createUserForm.password"></b-input>
              </b-form-group>
              <b-form-group label="Xác nhận mật khẩu">
                <b-input type="password" v-model="createUserForm.repassword"></b-input>
              </b-form-group>
              <b-form-group>
                <b-button @click="createUser">Tạo</b-button>
              </b-form-group>
            </b-modal>
            <b-modal id="login" title="Đăng nhập" hide-footer @show="initLoginForm" size="lg">
              <b-row>
                <b-col cols="6">
                  <b-alert v-if="loginForm.error" variant="danger" show>{{ loginForm.error }}</b-alert>
                  <b-form-group label="Tên đăng nhập">
                    <b-input type="text" v-model="loginForm.username"></b-input>
                  </b-form-group>
                  <b-form-group label="Mật khẩu">
                    <b-input type="password" v-model="loginForm.password"></b-input>
                  </b-form-group>
                  <b-form-group>
                    <vue-recaptcha sitekey="6LdLzq4ZAAAAAF1LTdJ6lSygUIem9HTbuHbjBIoT" @verify="captchaVerified"/>
                  </b-form-group>
                  <b-form-group>
                    <div class="d-flex justify-content-between">
                      <b-button @click="login">Đăng nhập</b-button>
                      <a href="#" v-b-modal.forgot-password style="line-height: 40px;">Quên mật khẩu </a>
                      <b-modal id="forgot-password" title="Quên mật khẩu" @show="forgotForm.email = ''; forgotForm.password = ''" @ok="makeForgot">
                        <b-form-group label="Email">
                          <b-input v-model="forgotForm.email"/>
                        </b-form-group>
                        <b-form-group label="Password">
                          <b-input type="password" v-model="forgotForm.password"/>
                        </b-form-group>
                      </b-modal>
                    </div>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <div class="text-center">
                    <GoogleLogin :params="google.params" :onSuccess="googleLogin" :renderParams="google.renderParams" class="d-inline-block mb-3">Google</GoogleLogin>
                    <v-facebook-login app-id="930342367440752" @login="facebookLogin" 
                    class="d-inline-block"/>
                  </div>
                </b-col>
              </b-row>
            </b-modal>
          </b-nav-item>

          <b-nav-item-dropdown right class="ml-4" v-if="user">
            <template v-slot:button-content>
              <b-icon icon="person-fill" font-scale="1.6"></b-icon>
            </template>
            <b-dropdown-item :to="`/profile/${user.id}`">Hi <b>{{ user.username }}</b>!</b-dropdown-item>
            <b-dropdown-item to="/new-topic">Tạo thảo luận</b-dropdown-item>
            <b-dropdown-item @click="logout(); notify({ msg: 'Đăng xuất thành công!', variant: 'success'});">Đăng xuất</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <nuxt />
    <div class="site-footer text-center my-3">
      <small>
        <i>Copyright 2020 &copy; XANH.LIFE</i>
      </small>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import KhongDau from 'khong-dau';
import TopicList from '../components/TopicList';
import GoogleLogin from 'vue-google-login';
import VFacebookLogin from 'vue-facebook-login-component';
import VueRecaptcha from 'vue-recaptcha';

export default {
  components: {
    TopicList,
    GoogleLogin,
    VFacebookLogin,
    VueRecaptcha
  },
  data(){
    return {
      forgotForm: {
        email: '',
        password: ''
      },
      createUserForm: {
        error: '',
        username: '',
        email: '',
        password: '',
        repassword: ''
      },
      loginForm: {
        error: '',
        username: '',
        password: ''
      },
      searchQuery: '',
      google: {
        params: {
          client_id: "965256596934-rlfod4luu67jjjiaqvr9oiiass8sunbb.apps.googleusercontent.com"
        },
        renderParams: {
          width: 240,
          height: 45,
          longtitle: true
        }
      }
    }
  },
  computed: {
    ...mapState(['isLoading', 'notifyMsg', 'notifyMsgCreated', 'notifyVariant', 'user', 'access_token']),

    searchResult(){
      const query = KhongDau(this.searchQuery.trim(), ['chuyen', 'url']).toLowerCase();
      if (!query)
        return [];

      return this.topics.filter(topic => {
        const comparedWith = KhongDau(topic.title.trim(), ['chuyen', 'url']).toLowerCase();
        return comparedWith.indexOf(query) !== -1;
      }).slice(0, 10);
    }
  },
  methods: {
    ...mapMutations(['onload', 'outload', 'notify', 'saveUserSession', 'authenticate', 'logout']),

    initCreateUserForm(){
      this.createUserForm.error = '';
      this.createUserForm.username = '';
      this.createUserForm.email = '';
      this.createUserForm.password = '';
      this.createUserForm.repassword = '';
    },

    async createUser(){
      if (!this.createUserForm.username || 
        !this.createUserForm.email ||
        !this.createUserForm.password || 
        !this.createUserForm.repassword
      ) {
        this.createUserForm.error = 'Các trường không được để trống';
        return;
      }

      if (this.createUserForm.password !== this.createUserForm.repassword){
        this.createUserForm.error = 'Mật khẩu không khớp!';
        return;
      }

      this.onload();
      try {
        await this.$axios.$post('/user/register/', {
          username: this.createUserForm.username,
          password: this.createUserForm.password,
          email: this.createUserForm.email
        });

        this.notify({
          msg: 'Đã tạo tài khoản thành công!',
          variant: 'success'
        });
        this.$bvModal.hide('create-account');
        this.$bvModal.show('login');

      } catch(err){
        this.createUserForm.error = `Đã xảy ra lỗi - ${err.message}`;
      };

      this.outload();
    },

    initLoginForm(){
      this.loginForm.error = '';
      this.loginForm.username = '';
      this.loginForm.password = '';
    },

    async login(){
      if (!this.loginForm.username || 
        !this.loginForm.password
      ) {
        this.loginForm.error = 'Các trường không được để trống';
        return;
      }

      this.onload();
      try {
        const raw = await this.$axios.$post('/auth/token', {
          username: this.loginForm.username,
          password: this.loginForm.password,
          client_id: '0qpdV785oiE68mdCyMTbRSDQnqEOjKBcgoioWmF3',
          client_secret: 'fhHge0PrhNyhRj1pDpwKUJGNIXhD1wQZtnq1UOOPTQGogA677rGom1BaUuW11wfyPnu10FRnzqprYIx50AzFkutZ8DvVb8EC4DY3Kb4yQOQFr4KQi8k7G3jVrQtbuvvW',
          grant_type: 'password'
        });

        if (typeof raw === 'object' && raw.message){
          throw new Error(raw.message);
        }

        this.$axios.setHeader('Authorization', `Bearer ${raw.access_token}`);

        const { user } = await this.$axios.$get('/me/');
        this.saveUserSession({
          token: raw.access_token,
          user
        });

        this.notify({
          msg: 'Đăng nhập thành công!',
          variant: 'success'
        });
        this.$bvModal.hide('login');
      } catch(err){
        if (err && err.response && err.response.data && err.response.data.error === 'invalid_grant'){
          this.loginForm.error = `Tên người dùng hoặt mật khẩu không đúng!`;
        } else {
          this.loginForm.error = `Đã xảy ra lỗi - ${err.message}`;
        }
      };

      this.outload();
    },

    makeSearch(){
      // console.log(this.searchQuery);
    },

    async googleLogin(data){
      this.onload();
      try {
        const raw = await this.$axios.$post('/auth/convert-token', {
          client_id: 'BkVOSUdDY0az5crvutWgR7E4a0maPjvIisrL1rbC',
          client_secret: '00cacKL5FYOqXZdl17dSfNaCGJUJCzmUijDcyWAj1QPs69KpiZtwyhLrQcItAMbIoMb1wZ55jRNRa8DK9A1vSRbpStQvsctZ8I2p90d5YMroLX3L7h2SGHQvUfIOxwcf',
          grant_type: 'convert_token',
          backend: 'google-oauth2',
          token: data.wc.access_token
        });

        if (typeof raw === 'object' && raw.message){
          throw new Error(raw.message);
        }

        this.$axios.setHeader('Authorization', `Bearer ${raw.access_token}`);

        const { user } = await this.$axios.$get('/me/');
        this.saveUserSession({
          token: raw.access_token,
          user
        });

        this.notify({
          msg: 'Đăng nhập thành công!',
          variant: 'success'
        });
        this.$bvModal.hide('login');
      } catch(err){
        this.notify({
          msg: `Đã xảy ra lỗi - ${err.message}`,
          variant: 'danger'
        });
      };

      this.outload();
    },

    async facebookLogin(data){
      this.onload();
      try {
        const raw = await this.$axios.$post('/auth/convert-token', {
            client_id: 'BkVOSUdDY0az5crvutWgR7E4a0maPjvIisrL1rbC',
            client_secret: '00cacKL5FYOqXZdl17dSfNaCGJUJCzmUijDcyWAj1QPs69KpiZtwyhLrQcItAMbIoMb1wZ55jRNRa8DK9A1vSRbpStQvsctZ8I2p90d5YMroLX3L7h2SGHQvUfIOxwcf',
            grant_type: 'convert_token',
            backend: 'facebook',
            token: data.authResponse.accessToken
          });

        if (typeof raw === 'object' && raw.message){
          throw new Error(raw.message);
        }

        this.$axios.setHeader('Authorization', `Bearer ${raw.access_token}`);

        const { user } = await this.$axios.$get('/me/');
        this.saveUserSession({
          token: raw.access_token,
          user
        });

        this.notify({
          msg: 'Đăng nhập thành công!',
          variant: 'success'
        });
        this.$bvModal.hide('login');
      } catch(err){
        this.notify({
          msg: `Đã xảy ra lỗi - ${err.message}`,
          variant: 'danger'
        });
      };

      this.outload();
    },

    captchaVerified(res){
      console.log(res);
    },

    async makeForgot(){
      try {
        const { id, message } = await this.$axios.$post(`/user/password/reset/`, this.forgotForm);

        if (id){
          this.notify({
            msg: `Đã đổi mật khẩu`,
            variant: 'success'
          });
        } else {
          this.notify({
            msg: message,
            variant: 'danger'
          });
        }
      } catch(err){
        this.notify({
          msg: `Đã xảy ra lỗi - ${err.message}`,
          variant: 'danger'
        });
      };
    }
  },
  async mounted(){
    this.authenticate();

    if (this.access_token)
      this.$axios.setHeader('Authorization', `Bearer ${this.access_token}`);

    this.onload();
    this.topics = (await this.$axios.$get(`/topic/list`)).reverse();
    if (this.category){
      this.topics = this.topics.filter(t => t.category === this.category);
    }
    this.outload();

    setInterval(() => {
      if (Date.now() - this.notifyMsgCreated > 5000){
        this.notify('');
      }
    }, 5000);
  }
}
</script>

<style lang="scss">
.search-box {
  position: relative;

  .suggest {
    position: absolute;
    top: 50px;
    z-index: 1000;
    max-width: 300px;
    background-color: white;
    padding: .5em;

    a {
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 1.5em;
      width: 100%;
      overflow: hidden;
      margin-bottom: .5em;
    }
  }
}

.site-header {
  border-bottom: 1px solid #dee2e6;
  background-color: white;

  .vr {
    border-left: 1px solid #e0e0e0;
    height: 45px;
    width: 0;
    margin: 0 .5em;
  }
}

@media (min-width: 768px) {
}

.loading-wrapper {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .8);
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;
}

.global-loading {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #212529;

  .loading-item {
    top: 50%;
    left: 50%;
    position: absolute;
    margin-top: -30px;
    margin-left: -30px;
  }
}

@keyframes ldio-mosrpey9thc {
   0% { transform: translate(6px,40px) scale(0); }
  25% { transform: translate(6px,40px) scale(0); }
  50% { transform: translate(6px,40px) scale(1); }
  75% { transform: translate(40px,40px) scale(1); }
 100% { transform: translate(74px,40px) scale(1); }
}
@keyframes ldio-mosrpey9thc-r {
   0% { transform: translate(74px,40px) scale(1); }
 100% { transform: translate(74px,40px) scale(0); }
}
@keyframes ldio-mosrpey9thc-c {
   0% { background: #e15b64 }
  25% { background: #abbd81 }
  50% { background: #f8b26a }
  75% { background: #f47e60 }
 100% { background: #e15b64 }
}
.ldio-mosrpey9thc div {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transform: translate(40px,40px) scale(1);
  background: #e15b64;
  animation: ldio-mosrpey9thc 1s infinite cubic-bezier(0,0.5,0.5,1);
}
.ldio-mosrpey9thc div:nth-child(1) {
  background: #f47e60;
  transform: translate(74px,40px) scale(1);
  animation: ldio-mosrpey9thc-r 0.25s infinite cubic-bezier(0,0.5,0.5,1), ldio-mosrpey9thc-c 1s infinite step-start;
}.ldio-mosrpey9thc div:nth-child(2) {
  animation-delay: -0.25s;
  background: #e15b64;
}.ldio-mosrpey9thc div:nth-child(3) {
  animation-delay: -0.5s;
  background: #f47e60;
}.ldio-mosrpey9thc div:nth-child(4) {
  animation-delay: -0.75s;
  background: #f8b26a;
}.ldio-mosrpey9thc div:nth-child(5) {
  animation-delay: -1s;
  background: #abbd81;
}
.loadingio-spinner-ellipsis-2dcycax0m2q {
  width: 60px;
  height: 60px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-mosrpey9thc {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.6);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-mosrpey9thc div { box-sizing: content-box; }
/* generated by https://loading.io/ */

.notify-msg {
  position: fixed;
  bottom: 1em;
  right: 2em;
  padding: .5em 1em;
  box-shadow: 0 0 .3em #424242;
  z-index: 100000;
}
</style>
