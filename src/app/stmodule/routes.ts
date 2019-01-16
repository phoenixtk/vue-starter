import { RouteConfig } from 'vue-router/types/router';

export const StmoduleRoutes: RouteConfig[] = [
  {
    path:      '/stmodule',
    component: () => import(/* webpackChunkName: "stmodule" */ './Stmodule/Stmodule.vue').then((m: any) => m.default),
  },
];
