import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '@/views/Login.vue'),
  },
  {
    path: '/auth/callback',
    name: 'auth-callback',
    component: () =>
      import(
        /* webpackChunkName: "auth-callback" */ '@/components/auth/Callback.vue'
      ),
  },
  {
    path: '/admin',
    name: 'admin-home',
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "Admin" */ '@/views/admin/home.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
