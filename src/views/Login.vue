<template>
  <div>
    {{ isLogged }}
    <div v-if="!isLogged"><button @click="login">Entrar</button></div>
    <div v-else><button @click="logout">Sair</button></div>
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

<style></style>
