<template>
  <div class="container container-centered">
    <div class="login-content">
      <h1>Loading....</h1>
    </div>
  </div>
</template>
<script>
import { onMounted } from 'vue';
import router from '@/router';
import store from '@/store';
import { loginAuth } from '@/services/login/Login.service';
export default {
  // eslint-disable-next-line
  name: 'Callback',
  setup() {
    const routeQuery = router.currentRoute.query;

    const loginUser = async (code) => {
      loginAuth(code)
        .then((response) => {
          const { access_token, refresh_token } = response;
          store.dispatch('setToken', access_token);
          store.dispatch('setRefreshToken', refresh_token);
          router.push({ name: 'admin-home' });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      if (routeQuery.code) {
        loginUser(routeQuery.code);
      }
    });
  },
};
</script>
