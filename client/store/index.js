export const state = () => ({
  isLoading: false,
  loadCount: 0,
  apiURL: process.env.apiURL,
  notifyMsg: '',
  notifyVariant: 'light',
  notifyMsgCreated: Date.now(),
  user: null,
  access_token: null
});

export const mutations = {
  onload(state){
    state.loadCount++;
    state.isLoading = true;
  },

  outload(state){
    state.loadCount--;
    if (state.loadCount <= 0){
      state.loadCount == 0;
      state.isLoading = false;
    }
  },

  notify(state, payload){
    const { msg, variant } = payload;
    state.notifyMsg = msg;
    state.notifyVariant = variant || 'light';
    state.notifyMsgCreated = Date.now();
  },

  saveUserSession(state, payload){
    sessionStorage.setItem('sess-user', JSON.stringify(payload.user));
    sessionStorage.setItem('sess-token', payload.token);
    state.user = payload.user;
  },

  authenticate(state){
    try {
      const info = JSON.parse(sessionStorage.getItem('sess-user'));
      state.user = info;
      state.access_token = sessionStorage.getItem('sess-token');
      return info;
    } catch(err){
      return null;
    }
  },

  logout(state){
    state.user = null;
    state.access_token = null;
    sessionStorage.setItem('sess-user', '');
    sessionStorage.setItem('sess-token', '');
  }
};