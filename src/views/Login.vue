<template>
  <div class="container container-centered">
    <div class="login-content">
      <h1>Login</h1>
      <button v-if="!isLogged" class="huggy-button" @click="login">
        Fazer login com a Huggy
      </button>
      <button v-else class="huggy-button" @click="logout">Sair</button>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { LoginCode } from '@/services/login/Login.service';
import store from '@/store';
export default {
  // eslint-disable-next-line
  name: 'Login',
  setup() {
    const isLogged = ref(false);

    const login = () => {
      let response = LoginCode();
      window.location.href = response;
    };

    const logout = () => {
      store.dispatch('logoutUser');
      window.location.reload();
    };

    onMounted(() => {
      if (store.getters.isAuthenticated) {
        isLogged.value = true;
      }
    });

    return {
      login,
      logout,
      isLogged,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-content {
  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    color: #262626;
  }
}
</style>
