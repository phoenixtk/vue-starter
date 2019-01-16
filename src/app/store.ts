import Vue                      from 'vue';
import Vuex, { Store }          from 'vuex';
import { DefaultState, IState } from './state';
import { VuexPersist }          from './shared/plugins/vuex-persist/vuex-persist';
import { PersistLocalStorage }  from './shared/plugins/vuex-persist/PersistLocalStorage';
import { PersistCookieStorage } from './shared/plugins/vuex-persist/PersistCookieStorage';
import { AppModule }            from './app/module';
import { StmoduleModule }            from './stmodule/module';
import { LoginModule }            from './login/module';
import { AframeModule }            from './aframe/module';
import { StoneModule }            from './admin/stone/module';
import { StelementuiModule }            from './admin/stelementui/module';

Vue.use(Vuex);

const state: IState = (CLIENT && window.__INITIAL_STATE__) || DefaultState;

/* istanbul ignore next */
const beforePersistLocalStorage = (localState: IState): IState => {

  return localState;
};

/* istanbul ignore next */
const beforePersistCookieStorage = (localState: IState): IState => {
  delete localState.app.config;
  delete localState.app.defaultMessages;
  delete localState.app.redirectTo;

  return localState;
};

export const store: Store<IState> = new Vuex.Store(
  {
    state,
    plugins: [
      VuexPersist(
        [
          new PersistLocalStorage(['counter'], beforePersistLocalStorage),
          new PersistCookieStorage(
            ['app'],
            {
              cookieOptions: {
                expires: 365,
              },
              beforePersist: beforePersistCookieStorage,
            },
          ),
        ],
      ),
    ],
  },
);

store.registerModule(['app'], AppModule, { preserveState: true });
store.registerModule(['stmodule'], StmoduleModule, { preserveState: true });
store.registerModule(['login'], LoginModule, { preserveState: true });
store.registerModule(['aframe'], AframeModule, { preserveState: true });
store.registerModule(['stone'], StoneModule, { preserveState: true });
store.registerModule(['stelementui'], StelementuiModule, { preserveState: true });
