import { RouteConfig } from 'vue-router/types/router';
import aframe  from './Aframe/Aframe.vue';

export const AframeRoutes: RouteConfig[] = [
  {
    path:      '/admin',
    component: aframe,
    children: [
      {
        path:      'stone',
        component: () => import(/* webpackChunkName: "stone" */ '../admin/stone/Stone/Stone.vue').then((m: any) => m.default),
      },      {
        path:      'stelementui',
        component: () => import(/* webpackChunkName: "stelementui" */ '../admin/stelementui/Stelementui/Stelementui.vue').then((m: any) => m.default),
      },

    ],
  },
];
