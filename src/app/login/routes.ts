import { RouteConfig } from 'vue-router/types/router';

export const LoginRoutes: RouteConfig[] = [
  {
    path:      '/login',
    component: () => import(/* webpackChunkName: "login" */ './Login/Login.vue').then((m: any) => m.default),
  },
];
