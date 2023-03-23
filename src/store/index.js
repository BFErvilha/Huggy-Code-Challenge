import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    access_token: '',
    refresh_token: '',
  },
  getters: {
    access_token: (state) => state.access_token,
    refresh_token: (state) => state.access_token,
    isAuthenticated: (state) =>
      state.access_token !== null && state.access_token.length !== 0,
  },
  mutations: {
    storeToken(state, token) {
      state.access_token = token;
    },
    storeRefreshToken(state, refreshToken) {
      state.refresh_token = refreshToken;
    },
    eraseToken(state) {
      state.access_token = '';
      state.refresh_token = '';
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('storeToken', token);
    },
    setRefreshToken({ commit }, refreshToken) {
      commit('storeRefreshToken', refreshToken);
    },
    logoutUser({ commit }) {
      commit('eraseToken');
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      key: 'huggy-code-challenge',
    }),
  ],
});
