import Vue                               from 'vue';
import VueRouter, { Route, RouteRecord } from 'vue-router';
import Meta                              from 'vue-meta';
import { AppRoutes }                     from './app/routes';
import { HomeRoutes }                    from './home/routes';
import { StmoduleRoutes }                from './stmodule/routes';
import { LoginRoutes }                   from './login/routes';
import { ComponentsRoutes }              from './components/routes';
import { HttpService }                   from './shared/services/HttpService';
import { AframeRoutes }                 from './aframe/routes';

Vue.use(VueRouter);
Vue.use(Meta);

export const router: VueRouter = new VueRouter(
  {
    mode:   'history',
    base:   __dirname,
    routes: [
      ...AppRoutes,
      ...HomeRoutes,
      ...StmoduleRoutes,
      ...ComponentsRoutes,
     ...LoginRoutes,
     ...AframeRoutes,
   ],
    scrollBehavior(to: Route, from: Route, savedPosition: { x: number, y: number }) {
      if (to.hash) {
        return { selector: to.hash };
      }
      return savedPosition || { x: 0, y: 0 };
    },
  },
);

// example guard
// TODO remove or adjust in production code
router.beforeEach((to: Route, from: Route, next: any) => {
  // console.log(from.path);
  /*if (from.path === '/' && !HttpService.store.state.login.token) {
    HttpService.store.state.login.token = HttpService.store.getters['login/getToken'];
  }*/

  if (to.matched.some((record: RouteRecord) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in if not, redirect to login page.
    const isAuthenticated = false; // TODO implement real auth check
    if (!isAuthenticated) {
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});
