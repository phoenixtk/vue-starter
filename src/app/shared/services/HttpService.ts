import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Store }                                                               from 'vuex';
import { IState }                                                              from '../../state';
import { Md5 }                                                                 from 'ts-md5/dist/md5';

export interface IHttpService extends AxiosInstance {
  store?: Store<IState>;
}

export const HttpService: IHttpService = axios.create();

function mix(config: AxiosRequestConfig) {
  // console.log(config);
  const configData = config.data;
  const privateKey = HttpService.store.state.app.config.api.privateKey;
  config.headers['X-AUTH-SIGN'] = Md5.hashStr(JSON.stringify(configData) + privateKey);
}

/* istanbul ignore next */
HttpService.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // get token from HttpService.store e.g. const token: string = HttpService.store.state.auth.accessToken;
    // console.log(config);
    const token: string = '';
    let baseUrl: string;
    if (config.params && config.params.userMock === true) {
      baseUrl = HttpService.store && HttpService.store.state.app.config ? HttpService.store.state.app.config.api.mockUrl : '';
    } else {
      baseUrl = HttpService.store && HttpService.store.state.app.config ? HttpService.store.state.app.config.api.baseUrl : '';
    }
    const isExternal: boolean = config.url.indexOf('://') > -1 && config.url.indexOf('i18n') === -1;
    mix(config);
    // console.log(HttpService.store.getters['login/getToken']);
    if (HttpService.store.state.login.token) {
      config.headers['X-AUTH-TOKEN'] = HttpService.store.state.login.token;
    } else if (HttpService.store.getters['login/getToken']) {
      config.headers['X-AUTH-TOKEN'] = HttpService.store.getters['login/getToken'];
    }
    if (token && !isExternal && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!isExternal && config.url !== '/log/error') {
      config.url = `${baseUrl}${config.url}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/* istanbul ignore next */
HttpService.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const originalRequest: any = error.config;
    /**
     * TODO: add condition for refreshing the token
     * const shouldRefresh: boolean = HttpService.store.state.auth.accessToken !== null &&
     * (error.response.status === 401 || error.response.status === 403) &&
     * !originalRequest._retry;
     */

    const shouldRefresh: boolean = false;

    if (shouldRefresh) {
      originalRequest._retry = true;

      /**
       * TODO: return function that refreshes the token
       * return HttpService.store.dispatch('refreshToken')
       * .then(() => {
       *     if (originalRequest.headers.Authorization && originalRequest.headers.Authorization.indexOf('Bearer') > -1) {
       *       originalRequest.headers.Authorization = `Bearer ${HttpService.store.state.auth.accessToken}`;
       *     }
       *
       *     return Promise.resolve(HttpService(originalRequest));
       * });
       */
    }

    return Promise.reject(error);
  });
